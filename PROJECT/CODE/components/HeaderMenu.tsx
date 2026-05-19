// -- IMPORTS

import { getApplicationData, getLanguageCodePath, getLocalizedText } from "../application.ts";

// -- FUNCTIONS

export default function HeaderMenu(
    {
        languageCode
    }
    )
{
    let applicationData = getApplicationData();
    let homePageData = applicationData.homePage;
    let path = typeof window !== "undefined" ? window.location.pathname : "/";

    return (
        <header className="header-menu">
            <div className="header-menu-container">
                <div className="header-menu-logo">
                    <h1 className="header-menu-logo-text">
                        { getLocalizedText( homePageData.title ) }
                    </h1>
                </div>
                <nav className="header-menu-nav">
                    <ul className="header-menu-list">
                        { applicationData.headerMenuButtonArray.map(
                            ( menuButtonItem, buttonIndex ) =>
                            (
                                <li key={ buttonIndex } className="header-menu-item">
                                    <a
                                        href={ `/${ languageCode }/${ menuButtonItem.route }` }
                                        className="header-menu-button"
                                    >
                                        <span className="header-menu-button-text">
                                            { getLocalizedText( menuButtonItem.text ) }
                                        </span>
                                    </a>
                                </li>
                            )
                            )}
                    </ul>
                </nav>
                <div className="header-menu-language">
                    <select
                        className="header-menu-language-select"
                        value={ languageCode }
                        onChange={
                            ( event ) =>
                                window.location.href
                                    = getLanguageCodePath(
                                        path,
                                        ( event.target as HTMLSelectElement ).value
                                        )
                            }
                    >
                        { Object.entries( applicationData.languageByCodeMap ).map(
                            ( [ languageCode, languageItem ] ) =>
                            (
                                <option key={ languageCode } value={ languageCode }>
                                    { getLocalizedText( ( languageItem as any ).name ) }
                                </option>
                            )
                            )}
                    </select>
                </div>
            </div>
        </header>
        );
}
