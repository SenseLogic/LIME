// -- IMPORTS

import { logError } from 'senselogic-opus';
import { createCappedImage, createCoveredImage } from 'senselogic-pixi';
import { bunnyService } from './bunny_service.js';
import { supabaseService } from './supabase_service.js';

// -- TYPES

export class FileService
{
    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        if ( filePath.startsWith( '/bunny/' ) )
        {
            return bunnyService.getFileUrl( filePath );
        }
        else if ( filePath.startsWith( '/supabase/' ) )
        {
            return supabaseService.getFileUrl( filePath );
        }
        else
        {
            return filePath;
        }
    }

    // -- OPERATIONS

    async copyFile(
        sourceFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        if ( filePath.startsWith( '/bunny/' ) )
        {
            return await supabaseService.copyFile( sourceFile, targetFilePath, targetFileIsOverwritten );
        }
        else if ( filePath.startsWith( '/supabase/' ) )
        {
            return await supabaseService.copyFile( sourceFile, targetFilePath, targetFileIsOverwritten );
        }
        else
        {
            return await Deno.copyFile( sourceFile, targetFilePath );
        }
    }

    // ~~

    async removeFile(
        targetFilePath
        )
    {
        if ( targetFilePath.startsWith( '/bunny/' ) )
        {
            return await bunnyService.removeFile( targetFilePath );
        }
        else if ( targetFilePath.startsWith( '/supabase/' ) )
        {
            return await supabaseService.removeFile( targetFilePath );
        }
        else
        {
            return await Deno.remove( targetFilePath );
        }
    }

    // ~~

    async copyImageFile(
        sourceImageFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        let preloadImage = createCappedImage( image, 360, 720, 'avif', 30 );
        let preloadImageFilePath = targetFilePath + '.preload.avif';
        await this.copyFile( preloadImage, preloadImageFilePath, targetFileIsOverwritten );

        let tinyImage = createCappedImage( image, 480, 960, 'avif', 60 );
        let tinyImageFilePath = targetFilePath + '.tiny.avif';
        await this.copyFile( tinyImage, tinyImageFilePath, targetFileIsOverwritten );

        let smallImage = createCappedImage( image, 640, 1280, 'avif', 60 );
        let smallImageFilePath = targetFilePath + '.small.avif';
        await this.copyFile( smallImage, smallImageFilePath, targetFileIsOverwritten );

        let mediumImage = createCappedImage( image, 960, 1920, 'avif', 60 );
        let mediumImageFilePath = targetFilePath + '.medium.avif';
        await this.copyFile( mediumImage, mediumImageFilePath, targetFileIsOverwritten );

        let wideImage = createCappedImage( image, 1280, 2560, 'avif', 60 );
        let wideImageFilePath = targetFilePath + '.wide.avif';
        await this.copyFile( wideImage, wideImageFilePath, targetFileIsOverwritten );

        let largeImage = createCappedImage( image, 1920, 1920, 'avif', 60 );
        let largeImageFilePath = targetFilePath;
        await this.copyFile( largeImage, largeImageFilePath, targetFileIsOverwritten );

        let bigImage = createCappedImage( image, 2560, 2560, 'avif', 60 );
        let bigImageFilePath = targetFilePath + '.big.avif';
        await this.copyFile( bigImage, bigImageFilePath, targetFileIsOverwritten );

        let hugeImage = createCappedImage( image, 3840, 3840, 'avif', 60 );
        let hugeImageFilePath = targetFilePath + '.huge.avif';
        await this.copyFile( hugeImage, hugeImageFilePath, targetFileIsOverwritten );

        let metaImage = createCoveredImage( image, 1200, 630, 'jpeg', 85 );
        let metaImageFilePath = targetFilePath + '.meta.jpg';
        await this.copyFile( metaImage, metaImageFilePath, targetFileIsOverwritten );
    }

    // ~~

    async removeImageFile(
        targetFilePath
        )
    {
        let preloadImageFilePath = targetFilePath + '.preload.avif';
        await this.removeFile( preloadImageFilePath );

        let tinyImageFilePath = targetFilePath + '.tiny.avif';
        await this.removeFile( tinyImageFilePath );

        let smallImageFilePath = targetFilePath + '.small.avif';
        await this.removeFile( smallImageFilePath );

        let mediumImageFilePath = targetFilePath + '.medium.avif';
        await this.removeFile( mediumImageFilePath );

        let wideImageFilePath = targetFilePath + '.wide.avif';
        await this.removeFile( wideImageFilePath );

        let largeImageFilePath = targetFilePath;
        await this.removeFile( largeImageFilePath );

        let bigImageFilePath = targetFilePath + '.big.avif';
        await this.removeFile( bigImageFilePath );

        let hugeImageFilePath = targetFilePath + '.huge.avif';
        await this.removeFile( hugeImageFilePath );

        let metaImageFilePath = targetFilePath + '.meta.jpg';
        await this.removeFile( metaImageFilePath );
    }

    // ~~

    async copyVideoFile(
        sourceVideoFile,
        targetFilePath,
        targetFileIsOverwritten = false
        )
    {
        return await this.copyFile( sourceVideoFile, targetFilePath, targetFileIsOverwritten );
    }

    // ~~

    async removeVideoFile(
        targetFilePath
        )
    {
        return await this.removeFile( targetFilePath );
    }
}

// -- VARIABLES

export let fileService = new FileService();
