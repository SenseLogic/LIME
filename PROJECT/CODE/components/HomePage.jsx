import { getLocalizedTextBySlug, getApplicationData } from '../application.js';

export default function HomePage()
{
    let applicationData = getApplicationData();
    let homePageContent = applicationData.homePageContent;

    return (
        <div className="home-page">
            <section className="home-page-hero">
                <div className="home-page-hero-container">
                    <div className="home-page-hero-content">
                        <h1 className="home-page-hero-title">
                            { getLocalizedTextBySlug( 'home-page-text' ) }
                        </h1>
                        <p className="home-page-hero-subtitle">
                            { homePageContent.heroSubtitle }
                        </p>
                        <div className="home-page-hero-actions">
                            <a href="/products" className="home-page-hero-button home-page-hero-button-primary">
                                { homePageContent.shopNowButton }
                            </a>
                            <a href="/about" className="home-page-hero-button home-page-hero-button-secondary">
                                { homePageContent.learnMoreButton }
                            </a>
                        </div>
                    </div>
                    <div className="home-page-hero-image">
                        <img
                            src="/logo.svg"
                            alt="LimeShoes Logo"
                            className="home-page-hero-logo"
                        />
                    </div>
                </div>
            </section>

            <section className="home-page-features">
                <div className="home-page-features-container">
                    <h2 className="home-page-features-title">{ homePageContent.featuresTitle }</h2>
                    <div className="home-page-features-grid">
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageContent.feature1Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageContent.feature1Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageContent.feature1Description }
                            </p>
                        </div>
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageContent.feature2Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageContent.feature2Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageContent.feature2Description }
                            </p>
                        </div>
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageContent.feature3Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageContent.feature3Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageContent.feature3Description }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

