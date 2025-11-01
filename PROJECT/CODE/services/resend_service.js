// -- IMPORTS

import { logError } from 'senselogic-gist';
import { Resend } from 'resend';

// -- TYPES

class ResendService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.client = null;
    }

    // -- INQUIRIES

    getClient(
        )
    {
        if ( this.client === null )
        {
            this.client = new Resend( Deno.env.get( "LIME_PROJECT_RESEND_KEY" ) );
        }

        return this.client;
    }

    // -- OPERATIONS

    async sendMail(
        sender,
        recipientArray,
        subject,
        emailBody
        )
    {
        let { data, error }
            = await this.getClient()
                .emails
                .send(
                    {
                        from: sender,
                        to: recipientArray,
                        subject: subject,
                        html: emailBody
                    }
                    );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async sendTemplateEmail(
        sender,
        recipientArray,
        subject,
        emailTemplateBody
        )
    {
        let { data, error }
            = await this.getClient()
                .emails
                .send(
                    {
                        from: sender,
                        to: recipientArray,
                        subject: subject,
                        react: emailTemplateBody
                    }
                    );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }
}

// -- VARIABLES

export let resendService = new ResendService();
