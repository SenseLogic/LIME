export let handler = {
    async POST( contactRequest )
    {
        try
        {
            let contactFormData = await contactRequest.formData();

            let contactSubmissionData = {
                name: contactFormData.get( "name" )?.toString() || "",
                email: contactFormData.get( "email" )?.toString() || "",
                message: contactFormData.get( "message" )?.toString() || "",
                timestamp: new Date().toISOString(),
                submittedAt: Date.now()
            };

            if ( !contactSubmissionData.name || !contactSubmissionData.email || !contactSubmissionData.message )
            {
                return new Response(
                    JSON.stringify(
                        {
                            success: false,
                            error: "All fields are required"
                        }
                    ),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json" }
                    }
                    );
            }

            let currentDateTime = new Date();
            let timestampString =
                currentDateTime.getFullYear().toString() +
                ( currentDateTime.getMonth() + 1 ).toString().padStart( 2, '0' ) +
                currentDateTime.getDate().toString().padStart( 2, '0' ) +
                currentDateTime.getHours().toString().padStart( 2, '0' ) +
                currentDateTime.getMinutes().toString().padStart( 2, '0' ) +
                currentDateTime.getSeconds().toString().padStart( 2, '0' ) +
                currentDateTime.getMilliseconds().toString().padStart( 3, '0' ) +
                Math.floor( Math.random() * 1000 ).toString().padStart( 3, '0' );

            let contactFileName = `${ timestampString }.json`;
            let contactFilePath = `./data/contact/${ contactFileName }`;

            await Deno.writeTextFile( contactFilePath, JSON.stringify( contactSubmissionData, null, 2 ) );

            return new Response(
                JSON.stringify(
                    {
                        success: true,
                        message: "Contact form submitted successfully",
                        filename: contactFileName
                    }
                ),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
                );
        }
        catch ( contactError )
        {
            console.error( "Error processing contact form:", contactError );

            return new Response(
                JSON.stringify(
                    {
                        success: false,
                        error: "Internal server error"
                    }
                ),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
                );
        }
    },
};

