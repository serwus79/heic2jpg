@echo off
echo downloading images from icloud
echo using https://github.com/icloud-photos-downloader
icloudpd --directory D:\Photos\icloud\ -u <username> --folder-structure {:%%Y/%%m}
heic2jpt --directory D:\Photos\icloud\