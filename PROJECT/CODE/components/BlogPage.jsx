import { getApplicationData } from "../application.js";

export default function BlogPage()
{
    let applicationData = getApplicationData();
    let blogPageData = applicationData.blogPage;
    let blogPostArray = applicationData.blogPostArray;
    let blogCategoryArray = applicationData.blogCategoryArray;

    return (
        <div className="blog-page">
            <section className="blog-page-hero">
                <div className="blog-page-hero-container">
                    <h1 className="blog-page-hero-title">
                        { blogPageData.title }
                    </h1>
                    <p className="blog-page-hero-subtitle">
                        { blogPageData.text }
                    </p>
                </div>
            </section>

            <section className="blog-page-content">
                <div className="blog-page-content-container">
                    <div className="blog-page-posts">
                        {
                            blogPostArray.map(
                                ( blogPostItem ) =>
                                (
                                    <article key={ blogPostItem.id } className="blog-page-post">
                                        <div className="blog-page-post-image">
                                            <img
                                                src={ blogPostItem.image }
                                                alt={ blogPostItem.title }
                                                className="blog-page-post-img"
                                            />
                                        </div>
                                        <div className="blog-page-post-content">
                                            <div className="blog-page-post-meta">
                                                <span className="blog-page-post-category">{ blogPostItem.category }</span>
                                                <span className="blog-page-post-date">{ blogPostItem.date }</span>
                                            </div>
                                            <h2 className="blog-page-post-title">{ blogPostItem.title }</h2>
                                            <p className="blog-page-post-excerpt">{ blogPostItem.excerpt }</p>
                                            <div className="blog-page-post-footer">
                                                <span className="blog-page-post-author">By { blogPostItem.author }</span>
                                                <a href={ `/blog/${ blogPostItem.id }` } className="blog-page-post-link">
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )
                        }
                    </div>

                    <aside className="blog-page-sidebar">
                        <div className="blog-page-sidebar-section">
                            <h3 className="blog-page-sidebar-title">Categories</h3>
                            <ul className="blog-page-sidebar-list">
                                {
                                    blogCategoryArray.map(
                                        ( categoryItem ) =>
                                        (
                                            <li key={ categoryItem.slug } className="blog-page-sidebar-item">
                                                <a href={ `/blog?category=${ categoryItem.slug }` } className="blog-page-sidebar-link">
                                                    { categoryItem.name }
                                                </a>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>

                        <div className="blog-page-sidebar-section">
                            <h3 className="blog-page-sidebar-title">Recent Posts</h3>
                            <ul className="blog-page-sidebar-list">
                                {
                                    blogPostArray.slice( 0, 3 ).map(
                                        ( recentPostItem ) =>
                                        (
                                            <li key={ recentPostItem.id } className="blog-page-sidebar-item">
                                                <a href={ `/blog/${ recentPostItem.id }` } className="blog-page-sidebar-link">
                                                    { recentPostItem.title }
                                                </a>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
