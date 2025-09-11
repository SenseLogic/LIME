import { getApplicationData } from "../application.js";

export default function AboutPage()
{
    let applicationData = getApplicationData();
    let aboutPageData = applicationData.aboutPage;

    return (
        <div className="about-page">
            <section className="about-page-hero">
                <div className="about-page-hero-container">
                    <h1 className="about-page-hero-title">
                        { aboutPageData.title }
                    </h1>
                    <p className="about-page-hero-subtitle">
                        { aboutPageData.text }
                    </p>
                </div>
            </section>

            <section className="about-page-content">
                <div className="about-page-content-container">
                    <div className="about-page-story">
                        <h2 className="about-page-story-title">{ aboutPageData.storyTitle }</h2>
                        <p className="about-page-story-text">
                            { aboutPageData.storyText1 }
                        </p>
                        <p className="about-page-story-text">
                            { aboutPageData.storyText2 }
                        </p>
                    </div>

                    <div className="about-page-values">
                        <h2 className="about-page-values-title">{ aboutPageData.valuesTitle }</h2>
                        <div className="about-page-values-grid">
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageData.value1Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageData.value1Description }
                                </p>
                            </div>
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageData.value2Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageData.value2Description }
                                </p>
                            </div>
                            <div className="about-page-value">
                                <h3 className="about-page-value-title">{ aboutPageData.value3Title }</h3>
                                <p className="about-page-value-description">
                                    { aboutPageData.value3Description }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

