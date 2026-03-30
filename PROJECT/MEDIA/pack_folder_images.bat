for %%f in (static\image\%1\*.png) do (
    %TOOL%\IMAGE_MAGICK\magick "%%f" -auto-orient -quality 100 -define heic:lossless=true -strip "static\image\%1\%%~nf.avif"
    del /q "%%f"
)
for %%f in (static\image\%1\*.jpg) do (
    %TOOL%\IMAGE_MAGICK\magick "%%f" -auto-orient -quality 100 -define heic:lossless=true -strip "static\image\%1\%%~nf.avif"
    del /q "%%f"
)
