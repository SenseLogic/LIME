import { getApplicationData } from "../application.js";

export default function HomePage()
{
    let applicationData = getApplicationData();
    let homePageData = applicationData.homePage;

    return (
        <div className="home-page">
            <section className="home-page-hero">
                <div className="home-page-hero-container">
                    <div className="home-page-hero-content">
                        <h1 className="home-page-hero-title">
                            { homePageData.title }
                        </h1>
                        <p className="home-page-hero-subtitle">
                            { homePageData.heroSubtitle }
                        </p>
                        <div className="home-page-hero-actions">
                            <a href="/products" className="home-page-hero-button home-page-hero-button-primary">
                                { homePageData.shopNowButton }
                            </a>
                            <a href="/about" className="home-page-hero-button home-page-hero-button-secondary">
                                { homePageData.learnMoreButton }
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
                    <h2 className="home-page-features-title">{ homePageData.featuresTitle }</h2>
                    <div className="home-page-features-grid">
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageData.feature1Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageData.feature1Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageData.feature1Description }
                            </p>
                        </div>
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageData.feature2Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageData.feature2Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageData.feature2Description }
                            </p>
                        </div>
                        <div className="home-page-feature">
                            <div className="home-page-feature-icon">{ homePageData.feature3Icon }</div>
                            <h3 className="home-page-feature-title">{ homePageData.feature3Title }</h3>
                            <p className="home-page-feature-description">
                                { homePageData.feature3Description }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
