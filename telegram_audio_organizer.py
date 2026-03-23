#!/usr/bin/env python3
"""
Telegram Audio Organizer Script

This script monitors a Telegram bot for newly downloaded audio files and organizes them
into separate directories based on download time.

Usage:
    python telegram_audio_organizer.py

Requirements:
    - python-telegram-bot library
    - Telegram bot token (set as environment variable TELEGRAM_BOT_TOKEN)
    - Download directory path (set as environment variable TELEGRAM_DOWNLOAD_DIR)
"""

import os
import sys
import time
import logging
import asyncio
import shutil
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, List
import tempfile

# Import telegram bot library
try:
    from telegram import Update, File
    from telegram.ext import Application, MessageHandler, filters, ContextTypes
except ImportError:
    print("Error: python-telegram-bot library not found.")
    print("Please install it with: pip install python-telegram-bot")
    sys.exit(1)

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class AudioOrganizer:
    def __init__(self, download_dir: str, bot_token: str):
        """
        Initialize the audio organizer.
        
        Args:
            download_dir: Directory where Telegram downloads files
            bot_token: Telegram bot token
        """
        self.download_dir = Path(download_dir)
        self.bot_token = bot_token
        self.new_audio_dir = self.download_dir / "new_downloads"
        self.processed_files = set()
        
        # Ensure directories exist
        self.download_dir.mkdir(parents=True, exist_ok=True)
        self.new_audio_dir.mkdir(exist_ok=True)
        
        logger.info(f"Initialized organizer with download dir: {self.download_dir}")
        logger.info(f"New audio will be moved to: {self.new_audio_dir}")

    async def start_monitoring(self):
        """Start the Telegram bot to monitor for audio files."""
        try:
            # Create application
            application = Application.builder().token(self.bot_token).build()
            
            # Add handler for audio files
            audio_handler = MessageHandler(
                filters.AUDIO | filters.VOICE, 
                self.handle_audio
            )
            application.add_handler(audio_handler)
            
            logger.info("Starting Telegram bot...")
            await application.run_polling()
            
        except Exception as e:
            logger.error(f"Error starting bot: {e}")
            raise

    async def handle_audio(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle incoming audio messages."""
        try:
            message = update.message
            user = update.effective_user
            
            # Get file information
            if message.audio:
                file_obj = message.audio
                file_type = "audio"
            elif message.voice:
                file_obj = message.voice
                file_type = "voice"
            else:
                return
            
            file_id = file_obj.file_id
            file_name = getattr(file_obj, 'file_name', None)
            file_size = file_obj.file_size
            
            logger.info(f"Received {file_type} from {user.username} (ID: {user.id})")
            logger.info(f"File ID: {file_id}, Size: {file_size} bytes")
            
            # Download the file
            file = await context.bot.get_file(file_id)
            
            # Generate safe filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            if file_name:
                # Use original filename if available
                safe_name = self._sanitize_filename(file_name)
            else:
                # Generate filename for voice messages
                safe_name = f"{file_type}_{timestamp}.ogg"
            
            # Add timestamp to make unique
            final_name = f"{timestamp}_{safe_name}"
            download_path = self.download_dir / final_name
            
            # Download file
            await file.download_to_drive(download_path)
            
            # Move to new downloads folder
            new_path = self.new_audio_dir / final_name
            shutil.move(str(download_path), str(new_path))
            
            # Send confirmation
            await message.reply_text(
                f"✅ Audio file received and organized!\n"
                f"📁 File: {final_name}\n"
                f"📥 Location: {new_path}\n"
                f"⏰ Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            )
            
            logger.info(f"Successfully processed: {final_name}")
            
        except Exception as e:
            logger.error(f"Error processing audio: {e}")
            if update and update.message:
                await update.message.reply_text(
                    f"❌ Error processing your audio file: {str(e)}"
                )

    def _sanitize_filename(self, filename: str) -> str:
        """Remove unsafe characters from filename."""
        # Replace problematic characters
        safe_chars = []
        for char in filename:
            if char.isalnum() or char in '._- ':
                safe_chars.append(char)
            else:
                safe_chars.append('_')
        
        return ''.join(safe_chars).strip()

    def get_new_files(self, since_hours: int = 24) -> List[Path]:
        """
        Get list of newly downloaded audio files.
        
        Args:
            since_hours: Look for files downloaded within these hours
            
        Returns:
            List of Path objects for new audio files
        """
        cutoff_time = datetime.now() - timedelta(hours=since_hours)
        new_files = []
        
        if not self.new_audio_dir.exists():
            return new_files
            
        for file_path in self.new_audio_dir.iterdir():
            if file_path.is_file():
                file_mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
                if file_mtime >= cutoff_time:
                    new_files.append(file_path)
        
        return sorted(new_files, key=lambda x: x.stat().st_mtime, reverse=True)

    def list_new_files(self, since_hours: int = 24):
        """Print list of new audio files."""
        new_files = self.get_new_files(since_hours)
        
        if not new_files:
            print(f"No new audio files found in the last {since_hours} hours.")
            return
        
        print(f"New audio files (last {since_hours} hours):")
        print("-" * 50)
        
        for file_path in new_files:
            stat = file_path.stat()
            mtime = datetime.fromtimestamp(stat.st_mtime)
            size_mb = stat.st_size / (1024 * 1024)
            
            print(f"📁 {file_path.name}")
            print(f"   📅 Downloaded: {mtime.strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"   📏 Size: {size_mb:.2f} MB")
            print()

def main():
    """Main function to run the script."""
    # Get configuration from environment variables
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    download_dir = os.getenv('TELEGRAM_DOWNLOAD_DIR', './telegram_downloads')
    
    if not bot_token:
        print("Error: TELEGRAM_BOT_TOKEN environment variable not set.")
        print("Please set it with: export TELEGRAM_BOT_TOKEN='your_bot_token'")
        sys.exit(1)
    
    print("🚀 Telegram Audio Organizer")
    print("=" * 40)
    print(f"Download directory: {download_dir}")
    print(f"Bot token: {'*' * len(bot_token[:-4]) + bot_token[-4:]}")  # Show last 4 chars only
    print()
    
    # Create organizer instance
    organizer = AudioOrganizer(download_dir, bot_token)
    
    try:
        # Start monitoring
        asyncio.run(organizer.start_monitoring())
    except KeyboardInterrupt:
        print("\n🛑 Stopping organizer...")
        logger.info("Organizer stopped by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()