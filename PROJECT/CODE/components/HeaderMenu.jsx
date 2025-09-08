import { getLocalizedTextBySlug, getApplicationData, getLanguageCodePath, getPathWithoutLanguage } from '../application.js';

export default function HeaderMenu( { languageCode } )
{
    let applicationData = getApplicationData();
    let path = typeof window !== 'undefined' ? window.location.pathname : '/';
    let pathWithoutLanguage = getPathWithoutLanguage( path );

    return (
        <header className="header-menu">
            <div className="header-menu-container">
                <div className="header-menu-logo">
                    <h1 className="header-menu-logo-text">
                        { getLocalizedTextBySlug( 'home-page-text' ) }
                    </h1>
                </div>
                <nav className="header-menu-nav">
                    <ul className="header-menu-list">
                        {
                            applicationData.headerMenuButtonArray.map(
                                ( menuButtonItem, buttonIndex ) =>
                                (
                                    <li key={ buttonIndex } className="header-menu-item">
                                        <a
                                            href={ `/${ languageCode }/${ menuButtonItem.route }` }
                                            className="header-menu-button"
                                        >
                                            <span className="header-menu-button-text">
                                                { menuButtonItem.text }
                                            </span>
                                        </a>
                                    </li>
                                )
                                )
                        }
                    </ul>
                </nav>
                <div className="header-menu-language">
                    <select 
                        className="header-menu-language-select"
                        value={ languageCode }
                        onChange={ ( event ) => window.location.href = getLanguageCodePath( path, event.target.value ) }
                    >
                        {
                            Object.entries( applicationData.languageByCodeMap ).map(
                                ( [ languageCode, languageItem ] ) =>
                                (
                                    <option key={ languageCode } value={ languageCode }>
                                        { languageItem.name }
                                    </option>
                                )
                                )
                        }
                    </select>
                </div>
            </div>
        </header>
    );
}

