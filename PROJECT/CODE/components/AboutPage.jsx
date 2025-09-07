import { getLocalizedTextBySlug, getApplicationData } from '../application.js';

export default function AboutPage()
{
    let applicationData = getApplicationData();
    let aboutPageContent = applicationData.aboutPageContent;

    return (
        <div className="about-page">
            <section className="about-page-hero">
                <div className="about-page-hero-container">
                    <h1 className="about-page-hero-title">
                        { getLocalizedTextBySlug( 'about-page-title' ) }
                    </h1>
                    <p className="about-page-hero-subtitle">
                        { getLocalizedTextBySlug( 'about-page-text' ) }
                    </p>
                </div>
            </section>

            <section className="about-page-content">
                <div className="about-page-content-container">
                    <div className="about-page-story">
                        <h2 className="about-page-story-title">{ aboutPageContent.storyTitle }</h2>
                        <p className="about-page-story-text">
                            { aboutPageContent.storyText1 }
                        </p>
                        <p className="about-page-story-text">
                            { aboutPageContent.storyText2 }
                        </p>
                    </div>

                    <div className="about-page-values">
                        <h2 className="about-page-values-title">{ aboutPageContent.valuesTitle }</h2>
                        <div className="about-page-values-grid">
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageContent.value1Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageContent.value1Description }
                                </p>
                            </div>
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageContent.value2Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageContent.value2Description }
                                </p>
                            </div>
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageContent.value3Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageContent.value3Description }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

