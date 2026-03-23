#!/usr/bin/env python3
"""
Simple Automation Script
This script demonstrates basic automation tasks including:
- File operations
- Text processing
- System commands
- Web requests
"""

import os
import shutil
import requests
import json
from datetime import datetime
import time

def create_backup_directory():
    """Create a backup directory with timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = f"backup_{timestamp}"
    
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        print(f"✓ Created backup directory: {backup_dir}")
    else:
        print(f"✗ Backup directory {backup_dir} already exists")
    
    return backup_dir

def backup_files(source_dir, backup_dir):
    """Backup files from source directory to backup directory"""
    if not os.path.exists(source_dir):
        print(f"✗ Source directory {source_dir} does not exist")
        return False
    
    files_copied = 0
    for filename in os.listdir(source_dir):
        source_file = os.path.join(source_dir, filename)
        if os.path.isfile(source_file):
            backup_file = os.path.join(backup_dir, filename)
            shutil.copy2(source_file, backup_file)
            files_copied += 1
    
    print(f"✓ Copied {files_copied} files to backup directory")
    return True

def process_text_file(input_file, output_file):
    """Process a text file - count words and lines"""
    if not os.path.exists(input_file):
        print(f"✗ Input file {input_file} does not exist")
        return False
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        words = content.split()
        
        # Create summary
        summary = f"""Text File Analysis Report
Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
File: {input_file}

Statistics:
- Total lines: {len(lines)}
- Total words: {len(words)}
- Total characters: {len(content)}
- Average words per line: {len(words) / len(lines) if lines else 0:.2f}
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(summary)
        
        print(f"✓ Processed {input_file} -> {output_file}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing file: {e}")
        return False

def check_website_status(url):
    """Check if a website is accessible"""
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"✓ Website {url} is accessible (Status: {response.status_code})")
            return True
        else:
            print(f"✗ Website {url} returned status {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"✗ Error checking website {url}: {e}")
        return False

def create_log_file(log_data, filename="automation_log.txt"):
    """Create a log file with automation results"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("Automation Script Log\n")
            f.write("=" * 50 + "\n")
            f.write(f"Run at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
            
            for entry in log_data:
                f.write(f"{entry}\n")
        
        print(f"✓ Created log file: {filename}")
        return True
    except Exception as e:
        print(f"✗ Error creating log file: {e}")
        return False

def main():
    """Main automation function"""
    print("🚀 Starting Automation Script...")
    print("=" * 50)
    
    log_entries = []
    
    # 1. Create backup directory
    backup_dir = create_backup_directory()
    log_entries.append(f"Backup directory created: {backup_dir}")
    
    # 2. Backup files (if source directory exists)
    source_dir = "audio_list"  # Using existing directory from project
    if os.path.exists(source_dir):
        backup_success = backup_files(source_dir, backup_dir)
        log_entries.append(f"File backup: {'Success' if backup_success else 'Failed'}")
    else:
        print(f"ℹ Source directory {source_dir} not found, skipping backup")
        log_entries.append("File backup: Skipped (source directory not found)")
    
    # 3. Process text file (create sample file first if it doesn't exist)
    sample_text = """This is a sample text file for automation testing.
It contains multiple lines and words.
Automation is fun and useful!
Python makes automation easy."""
    
    if not os.path.exists("sample_input.txt"):
        with open("sample_input.txt", 'w') as f:
            f.write(sample_text)
        print("✓ Created sample input file")
    
    process_success = process_text_file("sample_input.txt", "analysis_report.txt")
    log_entries.append(f"Text processing: {'Success' if process_success else 'Failed'}")
    
    # 4. Check website status
    websites = ["https://www.google.com", "https://www.github.com"]
    for website in websites:
        status = check_website_status(website)
        log_entries.append(f"Website check ({website}): {'Success' if status else 'Failed'}")
    
    # 5. Create log file
    log_success = create_log_file(log_entries)
    log_entries.append(f"Log creation: {'Success' if log_success else 'Failed'}")
    
    print("\n" + "=" * 50)
    print("✅ Automation Script Completed!")
    print(f"📁 Backup directory: {backup_dir}")
    print(f"📄 Analysis report: analysis_report.txt")
    print(f"📝 Log file: automation_log.txt")
    
    return True

if __name__ == "__main__":
    main()