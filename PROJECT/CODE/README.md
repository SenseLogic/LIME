# Lime Project – Sport Shoes E‑Commerce Platform (Technical Specification)

This document is the **canonical specification** for the Lime Project sport shoes e‑commerce platform.
Cursor AI agents should treat this as the main reference when generating or updating code in this repository.

---

## **High‑Level Overview**

- **Goal**: Build a **sport shoes e‑commerce platform** offering a curated selection of athletic footwear from major brands (Nike, Adidas, Puma, New Balance, Asics, etc.).
- **Business model**:
  - Direct-to-consumer sales of sport shoes.
  - Standard e‑commerce flow with cart, checkout, and order management.
- **Key capabilities**:
  - Public catalog of sport shoes with filtering by gender, category, brand, and size.
  - Product browsing and detail pages.
  - Contact form for customer inquiries.
  - Blog and testimonials sections for content marketing.
  - Multilingual support: English (by default), French, German.

**Core technologies**
- **Frontend + Backend**: Deno Fresh (islands architecture).
- **Database & Auth**: Supabase (Postgres, row‑level security, JWT auth).
- **Payments**: Stripe (Checkout + Payment Intents + webhooks).
- **Emails**: Resend for transactional email.
- **Image Processing**: Sharp and Senselogic-pika for high‑performance image manipulation (resizing, format conversion, optimization).
- **Internationalization**: Senselogic‑lingo for multilingual text management and localization (English, French, German).
- **Definition Files**: Senselogic‑def for reading and parsing structured definition files (application data, configuration) with multilingual texts and data structures.
- **Utilities**: Senselogic‑opus and Senselogic-iota for common utility functions (map operations, error logging, UUID and TUID generation) used across services.
- **Storage**: Bunny CDN for media file storage and delivery.

**Core application files**
- **`application.js`**: Main application data loader that reads definition files (`data/application_data.def`) and provides centralized access to all application data (products, categories, brands, pages, etc.). Also handles language code detection and path manipulation for multilingual routing.
- **`base/image.js`**: Utility module for image processing using Sharp (reading, writing, resizing, format conversion to AVIF).
- **`services/authentification_service.js`**: Handles user authentication (sign up, sign in, sign out) via Supabase Auth.
- **`services/bunny_service.js`**: Manages file storage and CDN operations with Bunny CDN.
- **`services/contact_service.js`**: Manages contact form submissions, CRUD operations for the `CONTACT` table.
- **`services/file_service.js`**: File operations (upload, download, delete) with Supabase Storage.
- **`services/resend_service.js`**: Email sending service using Resend API for transactional emails.
- **`services/stripe_service.js`**: Payment processing service using Stripe API (checkout sessions, payment intents, webhook verification).
- **`services/supabase_service.js`**: Core Supabase client initialization and database operations.

---

## **User Roles & Capabilities**

- **Visitor (unauthenticated)**:
  - Browse public pages: home, about, products, blog, testimonials, contact.
  - View product catalog with filtering options (gender, category, brand, size).
  - Submit contact form inquiries.
  - Cannot access account or admin dashboards.

- **Customer (role `customer`)**:
  - Full shopping experience: cart, checkout, orders (when implemented).
  - Manage profile and delivery addresses (when implemented).
  - View order history and order details (when implemented).

- **Admin (role `admin`)**:
  - Full oversight of products, orders, system settings, and reporting (when implemented).
  - Can manage product catalog, content, and system configuration (when implemented).

---

## **Route & Permission Model**

Permissions are enforced by **role**:

- **Public routes**:
  - `/` or `/[languageCode]` – Home page.
  - `/about` or `/[languageCode]/about` – About page.
  - `/products` or `/[languageCode]/products` – Product catalog.
  - `/blog` or `/[languageCode]/blog` – Blog listing.
  - `/testimonials` or `/[languageCode]/testimonials` – Testimonials page.
  - `/contact` or `/[languageCode]/contact` – Contact form page.
  - All routes support language code prefixes (e.g., `/en/products`, `/fr/products`, `/de/products`).

- **Customer routes** (`/account*`) – *To be implemented*:
  - Require authenticated user with role `customer`.
  - Unauthorized → redirect to `/login?redirect=/account`.

- **Admin routes** (`/admin*`) – *To be implemented*:
  - Require role `admin`.
  - Unauthorized → `/login?role=admin` or 403.

**Auth flow** – *To be implemented*:
- Supabase Auth handles sign‑up/login for all roles.
- On login:
  - Read `user.app_metadata.role` → set global role context.
- Deno Fresh middleware or route‑level guards use this context to allow or deny access before rendering.

---

## **Main Pages & Flows**

### **Public / Customer‑Facing Pages**

- **`/` or `/[languageCode]` – Home**
  - Hero banner, value proposition, call‑to‑action to shop.
  - Features section highlighting key benefits.
  - Uses `HeaderMenu` component.
  - Implemented via `HomePage` component.

- **`/products` or `/[languageCode]/products` – Product Catalog**
  - Grid display of all sport shoes.
  - Filters: gender (Men/Women), category (Casual/Running/Tennis), brand (Nike, Adidas, Puma, etc.).
  - Each product card shows: brand, model, category, gender, available sizes, price, and image.
  - "Add to Cart" button (functionality to be implemented).
  - Uses `ProductsPage` component.

- **`/products/[id]` – Product Detail** – *To be implemented*
  - Detailed product information: brand, model, full description, all available sizes.
  - Product image gallery.
  - Size selector.
  - Price and "Add to Cart" functionality.

- **`/about` or `/[languageCode]/about` – About Page**
  - Company information and story.
  - Uses `AboutPage` component.

- **`/blog` or `/[languageCode]/blog` – Blog Listing**
  - List of blog posts with categories.
  - Uses `BlogPage` component.

- **`/testimonials` or `/[languageCode]/testimonials` – Testimonials**
  - Customer testimonials and reviews.
  - Uses `TestimonialsPage` component.

- **`/contact` or `/[languageCode]/contact` – Contact Form**
  - Contact form with name, email, and message fields.
  - Submits to `/api/contact` endpoint.
  - Sends confirmation email via Resend.
  - Uses `ContactPage` component.

- **`/cart` – Shopping Cart** – *To be implemented*
  - Shows selected products with quantities.
  - Displays subtotal, VAT, estimated shipping, and total.
  - "Proceed to Checkout" button.

- **`/checkout` – Checkout** – *To be implemented*
  - Multi‑step checkout process.
  - Shipping address collection.
  - Payment processing (Stripe integration).

- **`/checkout/success`** / **`/checkout/cancel`** – *To be implemented*
  - Success: order summary and confirmation.
  - Cancel: friendly message with options to return to cart or browse products.

### **Customer Account** – *To be implemented*

- **`/account` – Dashboard**
  - Overview of pending orders, recent activity, quick links to profile, addresses, orders.

- **`/account/profile`**
  - Editable form: name, email, phone, password change, GDPR data/deletion helpers.

- **`/account/addresses`**
  - CRUD for delivery addresses.
  - Default address selection.

- **`/account/orders` & `/account/orders/[id]`**
  - Paginated list and detailed view of past orders.
  - Includes delivery details, status badges, tracking information.

### **Admin Area** – *To be implemented*

- **`/admin` – Dashboard**
  - KPIs: total products, sales (7d/30d), top categories, top brands.

- **`/admin/products`**
  - Product management: create, edit, delete products.
  - Bulk operations and inventory management.

- **`/admin/settings`**
  - System settings, email configuration, API keys.

- **`/admin/reports`**
  - Analytics (orders, revenue, product performance) with CSV exports.

---

## **Component Architecture (Key Reusable Components)**

Components should be implemented as **reusable islands** where appropriate.

- **`HeaderMenu`**
  - Global navigation bar: logo/site title, main links (Home, About, Products, Testimonials, Contact, Blog), and language selector.
  - Fully responsive with a hamburger menu on mobile.
  - Implemented in `components/HeaderMenu.jsx`.

- **`HomePage`**
  - Homepage component with hero section, features grid, and call‑to‑action buttons.
  - Implemented in `components/HomePage.jsx`.

- **`ProductsPage`**
  - Product catalog page with filter dropdowns (gender, category, brand) and product grid.
  - Each product card displays: brand, model, category, gender, available sizes, price, and image.
  - Implemented in `components/ProductsPage.jsx`.

- **`AboutPage`**
  - About page component displaying company information.
  - Implemented in `components/AboutPage.jsx`.

- **`BlogPage`**
  - Blog listing page with posts and categories.
  - Implemented in `components/BlogPage.jsx`.

- **`TestimonialsPage`**
  - Testimonials page displaying customer reviews.
  - Implemented in `components/TestimonialsPage.jsx`.

- **`ContactPage`**
  - Contact form page with name, email, and message fields.
  - Submits to `/api/contact` endpoint.
  - Implemented in `components/ContactPage.jsx`.

- **Route components**
  - **`_app.jsx`**: App wrapper component that provides layout structure and includes `HeaderMenu`.
  - **`_404.jsx`**: 404 error page for handling not found routes.
  - Route files in `routes/` and `routes/[languageCode]/` handle routing and delegate to page components.

- **UI utilities** – *To be implemented*
  - **`ProductCard`**: reusable product tile component for product listings.
  - **`SizeSelector`**: size selection component for product detail pages.
  - **`CookieConsentBanner`**: GDPR‑compliant floating banner explaining cookie usage, with "Accept All" / "Customize" buttons; stores preferences in `localStorage`.
  - **`EmptyState`**: generic placeholder (illustration + message) for empty carts, no products found, etc.
  - **`LoadingSpinner`**: animated loader used during API calls (adding to cart, submitting forms, loading lists).
  - **`NotificationToast`**: temporary success/error message for user actions (e.g., "Product added to cart," "Contact form submitted"), auto‑dismisses after a delay.
  - **`PaginationControls`**: reusable paginator for product lists, blog posts, and order history.
  - **`OrderStatusBadge`**: colored badge component for order statuses (when orders are implemented).

All components access application data via `getApplicationData()` from `application.js`. This provides centralized access to all definition files (products, categories, brands, pages, etc.).

Language code detection and path manipulation utilities are also available from `application.js`.

---

## **API Design**

All endpoints are implemented as Deno Fresh routes under `/api/*`.

### **Public (Unauthenticated)**

- **Contact**
  - `POST /api/contact`
    - Body: `{ name: string, email: string, message: string }`.
    - Validates all fields are provided.
    - Saves contact submission to Supabase `CONTACT` table.
    - Sends confirmation email via Resend.
    - Response: `{ success: boolean, message?: string, error?: string }`.
    - Implemented in `routes/api/contact.js`.

- **Products** – *To be implemented*
  - `GET /api/products`
    - Query params: `gender`, `category`, `brand`, `q` (search), `page`.
    - Response: `{ products: [...], total: number, page: number }`.
  - `GET /api/products/:id`
    - Returns product details including all available sizes, price, images, and specifications.

- **Cart & Checkout** – *To be implemented*
  - `POST /api/cart`
    - Body: `{ product_id, size, quantity }`.
    - Uses session/client ID to manage anonymous cart.
  - `GET /api/cart`
    - Returns `{ items: [...], subtotal: number, total: number }`.
  - `POST /api/checkout`
    - Processes checkout and creates order.
    - Integrates with Stripe for payment processing.

- **Auth** – *To be implemented*
  - `POST /api/auth/signup`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - All leverage Supabase Auth.

### **Authenticated – Customer** – *To be implemented*

- `GET /api/customer/profile`, `PUT /api/customer/profile`.
- `GET /api/customer/addresses`, `POST /api/customer/addresses`,
  `PUT /api/customer/addresses/:id`, `DELETE /api/customer/addresses/:id`.
- `GET /api/customer/orders`, `GET /api/customer/orders/:id`.

### **Authenticated – Admin** – *To be implemented*

- Dashboard & products:
  - `GET /api/admin/dashboard`
  - `GET /api/admin/products`
  - `POST /api/admin/products`
  - `GET /api/admin/products/:id`, `PUT /api/admin/products/:id`, `DELETE /api/admin/products/:id`.
- Settings:
  - `GET`/`PUT /api/admin/settings`.
- Reports:
  - `GET /api/admin/reports/sales`

### **Webhooks & Integrations** – *To be implemented*

- `POST /api/webhooks/stripe`
  - Verifies Stripe signature.
  - On `checkout.session.completed`: creates order, triggers confirmation email.
  - On `payment_intent.succeeded`: updates order payment status.

- `POST /api/webhooks/resend`
  - Logs email delivery status, bounces, complaints.

---

## **Data & Domain Model (Conceptual)**

The core data model is defined by the `lime_project` database schema (see `DATABASE/lime_project.bs` as the DSL source that generates SQL).
Main concepts and entities:

- **Users & profiles**
  - `PROFILE`: core user profile linked to `auth.users` via `userId`, with first/last name, email, and phone number.
  - Currently marked as "dropped" in schema (to be implemented).

- **Products**
  - Products are currently managed via definition files (`data/product_array.def`) rather than database tables.
  - Product structure includes:
    - `genderSlug`: links to gender lookup (men, women).
    - `categorySlug`: links to category lookup (casual, running, tennis).
    - `brandSlug`: links to brand lookup (nike, adidas, puma, new-balance, asics, etc.).
    - `model`: product model name (e.g., "Air Max 12", "Ultraboost 22").
    - `price`: product price in USD.
    - `sizeSlugArray`: array of available size slugs (extra-small, small, medium, large, extra-large).
    - `imagePath`: path to product image (e.g., `/image/product/product_1.avif`).

- **Lookup tables (definition files)**
  - `GENDER`: gender options (men, women) – defined in `data/gender_by_slug_map.def`.
  - `CATEGORY`: product categories (casual, running, tennis) – defined in `data/category_by_slug_map.def`.
  - `BRAND`: shoe brands (nike, adidas, puma, new-balance, asics, reebok, saucony, brooks, mizuno, salomon, skechers, fila, converse, vans, altra, etc.) – defined in `data/brand_by_slug_map.def`.
  - `SIZE`: shoe sizes (extra-small, small, medium, large, extra-large) – defined in `data/size_by_slug_map.def`.
  - `LANGUAGE`: supported languages (English, French, German) – defined in `data/language_by_code_map.def`.
  - `TEXT`: general text strings for localization – defined in `data/text_by_code_map.def`.

- **Content data (definition files)**
  - `BLOG_POST`: blog posts with title, excerpt, date, author, image, category – defined in `data/blog_post_array.def`.
  - `BLOG_CATEGORY`: blog post categories – defined in `data/blog_category_array.def`.
  - `TESTIMONIAL`: customer testimonials with date, name, text, rating, image – defined in `data/testimonial_array.def`.
  - `HEADER_MENU_BUTTON`: navigation menu items – defined in `data/header_menu_button_array.def`.

- **Page-specific data (definition files)**
  - `Home`: defined in `home_page.def`
  - `About`: defined in `about_page.def`
  - `Products`: defined in `products_page.def`
  - `Blog`: defined in `blog_page.def`
  - `Testimonials`: defined in `testimonials_page.def`
  - `Contact`: defined in `contact_page.def`.

- **Contacts**
  - `CONTACT`: stores contact form submissions (name, email, message) for the `/contact` page.
  - Fields: `id` (TUID), `name` (STRING), `email` (STRING), `message` (STRING), `creationTimestamp` (TIMESTAMP), `updateTimestamp` (TIMESTAMP).
  - Currently marked as "dropped" in schema but used by contact service.

- **Orders & carts** – *To be implemented*
  - `ORDER`: top‑level order with customer (`PROFILE`), status, shipping address, shipping cost, subtotal, VAT amount, total, currency, Stripe identifiers, tracking number.
  - `ORDER_ITEM`: line items linking an order to a product with size, quantity, unit price, and monetary breakdown.
  - `CART`: cart linked either to a logged‑in profile or to an anonymous `clientId`.
  - `CART_ITEM`: items in a cart pointing to product and size with quantity.

- **Addresses & delivery** – *To be implemented*
  - `ADDRESS`: saved customer addresses linked to `PROFILE`, with a default flag.
  - `DELIVERY_METHOD`: enumerates delivery options (home delivery, pickup, etc.).

- **Payments** – *To be implemented*
  - `PAYMENT`: records for order payments with Stripe payment ID, status, amount, currency, timestamp.
  - `INVOICE` and `INVOICE_LINE`: invoices related to orders, with subtotals, tax, totals, dates, and currency.

---

## **Shipping & Delivery Logic** – *To be implemented*

- Shipping cost calculation to be defined based on:
  - **From**: warehouse/supplier location.
  - **To**: customer's address country/postal code.
  - **Weight and dimensions** of all items.
  - **Delivery method** (standard, express, etc.).

- The actual implementation can use:
  - Pre‑configured shipping rates per country/region.
  - Weight‑based shipping calculation.
  - Integration with shipping carriers for real‑time rates.

---

## **Payments** – *To be implemented*

- **Stripe Checkout** for orders:
  - Line items from cart (price incl. VAT).
  - Webhook finalizes order in Supabase.
  - Payment confirmation emails sent via Resend.

- **Payment processing**:
  - Integration with Stripe for secure payment processing.
  - Support for multiple payment methods (credit card, etc.).
  - Order confirmation and receipt generation.

---

## **Notifications & Compliance**

- **Notifications (Resend)**:
  - Templates for:
    - Contact form confirmation emails (currently implemented).
    - Order confirmation and status updates (to be implemented).
    - Password reset and account verification (to be implemented).
  - Emails triggered by backend business events (e.g., contact form submitted, order placed).

- **GDPR & Cookies**:
  - `CookieConsentBanner` asking for analytics and email/marketing consent (to be implemented).
  - Mechanisms for data access/deletion (to be implemented).
  - Privacy policy and terms of service pages (to be implemented).

---

## **Coding Standards (For Generated Code)**

All Cursor AI agents must generate code that **visually matches the existing `.js` files in `CODE/services/`**.
Use those files (`authentification_service.js`, `bunny_service.js`, `contact_service.js`, `file_service.js`, `resend_service.js`, `supabase_service.js`) as the reference style.

### **Language & File Types**

- **JavaScript only for new code**
  - All newly generated application code must be **JavaScript**, not TypeScript.
  - Do **not** introduce new `.ts` or `.tsx` files; use `.js` and `.jsx` only.
  - Do not add TypeScript syntax (types, interfaces, generics, enums) to any file.
  - Existing `.ts`/`.tsx` files may remain as they are, but any new logic, routes, services, components, or islands created by AI should be written in JavaScript.

### **Indentation, Braces & General Layout**

- **Indentation**
  - Use **4 spaces per indentation level** in all `.js` and `.jsx` files (no tabs).
  - Nested blocks (classes, methods, `if`, loops, `try/catch`, chained calls) all increase indentation by 4 spaces.

- **Braces**
  - Opening braces are on their **own line**, directly under the construct they belong to:
    ```javascript
    class ContactService
    {
        // ...
    }
    ```
  - Closing braces are also on their **own line**, aligned vertically with the start of the construct.
  - This applies to `class`, `function`, `if`, `else`, `for`, `while`, `try`, `catch`, `finally`, and multi‑line object literals.

- **Function, method, and constructor declarations**
  - Follow the pattern used in `services`:
    - Function name on one line, opening parenthesis on the same line.
    - Parameters each on their **own line**, indented by 8 spaces.
    - Closing parenthesis on its own line, aligned with the parameter indentation.
    - Opening brace on its own next line.
  - Example:
    ```javascript
    async sendMail(
        sender,
        recipientArray,
        subject,
        emailBody
        )
    {
        // ...
    }
    ```

- **Multiline function calls**
  - For calls that span multiple lines, follow the style used in the services:
    - Call expression and opening parenthesis on one line.
    - Each argument or configuration object starts on its **own line**, indented once (or twice) to align visually, consistent with existing services.
    - Closing parenthesis and semicolon on their own line, vertically aligned with the start of the call or with the surrounding style.
  - Example (from `resend_service.js` style):
    ```javascript
    let { data, error } =
        await this.getClient()
            .emails
            .send(
                {
                    from: sender,
                    to: recipientArray,
                    subject: subject,
                    html: emailBody
                }
                );
    ```

- **Chained method calls**
  - For chains (e.g. Supabase query builder), put each `.method` on its **own line**, indented one level deeper than the base:
    ```javascript
    let { data, error } =
        await supabaseService.getClient()
            .from( "CONTACT" )
            .select()
            .eq( "id", contactId );
    ```

### **Spacing Rules**

- **Parentheses in calls and conditions**
  - In function calls and conditionals, use a space after `(` and before `)` when there is content:
    - `if ( error !== null )`, `logError( error )`, `data[ 0 ]`.
  - When `()` or `[]` are empty, keep them together: `()`, `[]`.
  - For multiline parameter lists (as in declarations), follow the existing pattern in the services: opening and closing parentheses on their own lines, parameters on separate lines without extra padding around them.

- **Brackets**
  - When indexing arrays, use **one space** after `[` and before `]`, as in `data[ 0 ]`.
  - When passing arrays as arguments, match existing style, e.g. `.remove( [ storageFilePath ] );`.

- **Binary operators**
  - Always have exactly **one space** around binary operators:
    - `valueOne === valueTwo`, `index = index + 1`, `statusCode !== 200`.

- **Assignments split over multiple lines**
  - When destructuring or assigning complex expressions, follow the existing pattern:
    - `let { data, error } =` on one line.
    - The awaited call or expression starts on the next line, indented by 4 spaces.
    ```javascript
    let { data, error } =
        await supabaseService.getClient()
            .from( "CONTACT" )
            .select();
    ```

### **Naming Conventions & Collections**

- **Collections**
  - Follow the “self‑documenting, singular root” pattern seen in the services:
    - Arrays: `cachedContactArray`, `recipientArray`, `contactArray`.
    - Maps: `cachedContactByIdMap`, `somethingByIdMap`.
  - When introducing new arrays and maps, prefer:
    - `thingArray` for arrays of `thing`.
    - `thingByKeyMap` for maps (e.g. `productBySlugMap`).
  - Avoid unnecessary abbreviations; favor clear, descriptive names.

- **`let` vs `const`**
  - Match the services: prefer `let` for most variables, even when technically not reassigned, except for obvious fixed constants (e.g. module‑level configuration).

### **Function Parameters**

In all function, method, and constructor **declarations**:
- Each parameter must be declared on its **own line**, following the style of the `services` folder.

### **CSS & Styling Conventions**

- **No Tailwind CSS**
  - Do **not** introduce Tailwind CSS or utility‑class frameworks.
  - Use **semantic CSS** defined in **global or shared CSS/SCSS files**.
- **Component‑scoped class naming**
  - CSS classes specific to a component or island must be prefixed with the component name in **slug‑case**.
  - Example for an island `Chatbox.tsx`:
    - `.chatbox`
    - `.chatbox-button`
    - `.chatbox-widget`
    - `.chatbox-widget-message-container`
    - `.chatbox-widget-message`
    - `.chatbox-widget-input`
    - `.chatbox-widget-close-button`

### **Application to Generated Code**

- All **new or modified JavaScript code** must:
  - Match the indentation, brace placement, and chaining style demonstrated in `CODE/services/*.js`.
  - Respect the spacing rules for calls, conditions, operators, arrays, and brackets.
  - Follow the naming patterns for arrays and maps (e.g. `contactArray`, `contactByIdMap`, `recipientArray`).
  - Prefer `.js`/`.jsx` and avoid creating any new TypeScript files or syntax.
  - Preserve string literal content (do not change whitespace inside strings).

These standards exist to keep the codebase **readable, self‑documenting, and stylistically consistent with the existing services**. Any automated refactor or new feature implementation must ensure these rules are applied.

---

## **Using This Spec with Cursor AI Agents**

- **When adding features**:
  - Check this README to align with business rules and existing patterns.
  - Respect routing structure and language code support.
  - Use the defined components (or new generic ones) to keep UI consistent.
  - Follow the coding standards defined in this document.

- **When touching data or APIs**:
  - Ensure endpoints follow RESTful conventions.
  - Keep Supabase schemas aligned with the conceptual model (products, orders, profiles, contacts).
  - Always enforce role‑based access when authentication is implemented.
  - Use definition files for static data (products, categories, brands, etc.) until database tables are created.

- **When unsure**:
  - Prefer **configurability** (admin‑controlled settings) instead of hard‑coding business constants.
  - Keep shipping, payment, and VAT logic central and well‑documented for future adjustment.
  - Follow existing patterns in services and components.

This specification should be kept **up‑to‑date** as the project evolves. Any major behavior or data model changes must be reflected here and in the `DOCUMENT` folder to stay consistent.
