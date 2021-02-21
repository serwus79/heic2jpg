# heic-dir-convert

Purpose of this cli is to convert all _.heic images downloaded with [icloud-photos-downloader](https://github.com/icloud-photos-downloader) Python script. It scans target directory, seek for _.heic file and convert each file to \*.jpg (with same name and only if target .jpg file not exists).

Example .bat file is in `download.bat`.

install:

```
npm i -g heic-dir-convert
```

```shell
icloudpd --directory D:\Photos\icloud\ -u <username> --folder-structure {:%%Y/%%m}
heic-dir-convert --directory D:\Photos\icloud\
```
