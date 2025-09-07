import { getLocalizedTextBySlug, getApplicationData } from '../application.js';

export default function ProductsPage()
{
    let applicationData = getApplicationData();

    return (
        <div className="products-page">
            <section className="products-page-hero">
                <div className="products-page-hero-container">
                    <h1 className="products-page-hero-title">
                        { getLocalizedTextBySlug( 'products-page-title' ) }
                    </h1>
                    <p className="products-page-hero-subtitle">
                        { getLocalizedTextBySlug( 'products-page-text' ) }
                    </p>
                </div>
            </section>

            <section className="products-page-filters">
                <div className="products-page-filters-container">
                    <div className="products-page-filter">
                        <label className="products-page-filter-label">
                            { getLocalizedTextBySlug( 'products-page-gender-button' ) }
                        </label>
                        <select className="products-page-filter-select">
                            <option value=''>All Genders</option>
                            {
                                Object.entries( applicationData.genderBySlugMap ).map(
                                    ( [ genderSlug, genderName ] ) =>
                                    (
                                        <option key={ genderSlug } value={ genderSlug }>{ genderName }</option>
                                    )
                                    )
                            }
                        </select>
                    </div>

                    <div className="products-page-filter">
                        <label className="products-page-filter-label">
                            { getLocalizedTextBySlug( 'products-page-category-button' ) }
                        </label>
                        <select className="products-page-filter-select">
                            <option value=''>All Categories</option>
                            {
                                Object.entries( applicationData.categoryBySlugMap ).map(
                                    ( [ categorySlug, categoryName ] ) =>
                                    (
                                        <option key={ categorySlug } value={ categorySlug }>{ categoryName }</option>
                                    )
                                    )
                            }
                        </select>
                    </div>

                    <div className="products-page-filter">
                        <label className="products-page-filter-label">
                            { getLocalizedTextBySlug( 'products-page-brand-button' ) }
                        </label>
                        <select className="products-page-filter-select">
                            <option value=''>All Brands</option>
                            {
                                Object.entries( applicationData.brandBySlugMap ).map(
                                    ( [ brandSlug, brandName ] ) =>
                                    (
                                        <option key={ brandSlug } value={ brandSlug }>{ brandName }</option>
                                    )
                                    )
                            }
                        </select>
                    </div>
                </div>
            </section>

            <section className="products-page-grid">
                <div className="products-page-grid-container">
                        {
                            applicationData.productArray.map(
                                ( productItem, productIndex ) =>
                                (
                                    <div key={ productIndex } className="products-page-product">
                                        <div className="products-page-product-image">
                                            <img
                                                src={ productItem.imagePath || '/logo.svg' }
                                                alt={ productItem.model }
                                                className="products-page-product-img"
                                            />
                                        </div>
                                        <div className="products-page-product-info">
                                            <h3 className="products-page-product-brand">
                                                { applicationData.brandBySlugMap[ productItem.brandSlug ] }
                                            </h3>
                                            <h4 className="products-page-product-model">{ productItem.model }</h4>
                                            <p className="products-page-product-category">
                                                { applicationData.categoryBySlugMap[ productItem.categorySlug ] }
                                            </p>
                                            <p className="products-page-product-gender">
                                                { applicationData.genderBySlugMap[ productItem.genderSlug ] }
                                            </p>
                                            <div className="products-page-product-sizes">
                                                <span className="products-page-product-sizes-label">Available Sizes:</span>
                                                <div className="products-page-product-sizes-list">
                                                    {
                                                        productItem.sizeSlugArray.map(
                                                            ( sizeSlugItem, sizeIndex ) =>
                                                            (
                                                                <span key={ sizeIndex } className="products-page-product-size">
                                                                    { applicationData.sizeBySlugMap[ sizeSlugItem ] }
                                                                </span>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="products-page-product-price">
                                                ${ productItem.price }
                                            </div>
                                            <button className="products-page-product-button">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                )
                                )
                        }
                </div>
            </section>
        </div>
    );
}

