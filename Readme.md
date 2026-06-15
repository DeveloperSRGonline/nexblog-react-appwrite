# Nexblog

## An blog uploding application

### Tech stack

```javascript
-React - Appwrite - React - Router - Dom - TinyMCE - HTML - React - Parser;
```

---

_Features_

=> Login to see posts on home page  
=> Footer  
=> Home  
=> Login ---|  
=> Signup --|----> form handling  
=> after account creation all post wil be shown  
=> post - [ image, title ,description - {text formating } ]

- addpost
  - title -> slug auto generate
  - content -> Tinymce rte
  - image upload
  - active Inactive
- Edit and Delete - only for own posts
- logout all home post will dissappear

> Mindset : Dont just copy and paste [ listen,note,then build without watching ]

# Appwrite - B.A.A.S

- Docs reading is must
- Input from user
- Image handling
- Image Tags handling
- Text formating
- State management - `Redux Toolkit`
- Routing - `React-router-dom`
- Form handling - `React-hook-form`
- HTML Rendering in browser - `React-HTML-Parser`

## Redux (example from this repo)

This project uses `@reduxjs/toolkit` for global state. Relevant files are under `src/store/`.

`src/store/store.js`

```javascript
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    authSlice,
  },
});

export default store;
```

`src/store/authSlice.js`

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
```

Wrap the app with the Redux `Provider` in `src/main.jsx`:

```javascript
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

Example usage in `src/App.jsx` (dispatching `login` / `logout` based on auth service):

```javascript
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

const dispatch = useDispatch();

// after fetching current user
if (userData) {
  dispatch(login({ userData }));
} else {
  dispatch(logout());
}
```

`Project create`

- `Auth`
- `Database`  
  `____`- `Articles`  
  `________`- `Documents[row]`  
  `________`- `attributes[columns]`
- `Storage`
- `Functions`

- Variables prefixed with VITE\_ will be exposed in client-side source code after Vite bundling.

# Env Variables

Vite exposes env variables under the `import.meta.env` object as strings automatically.

Variables prefixed with `VITE_` will be exposed in client-side source code after Vite bundling. To prevent accidentally leaking env variables to the client, avoid using this prefix. As an example, consider the following:

## `.env`

```env
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

The parsed value of `VITE_SOME_KEY` – `"123"` – will be exposed on the client, but the value of `DB_PASSWORD` will not. You can test this by adding the following to your code:

```js
console.log(import.meta.env.VITE_SOME_KEY); // "123"
console.log(import.meta.env.DB_PASSWORD); // undefined
```

---

_title_: Email and password login [https://appwrite.io/docs/products/auth/email-password]
_description_: Implement email and password authentication with Appwrite. Securely register and authenticate users in your applications using Appwrite's robust email-based authentication system.

---

# Signup

You can use the Appwrite Client SDKs to create an account using email and password.

```javascript
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  // if want to change service provider just need to change constructor and methods under the hood wrapper will same and app will run smoothly without any problem
  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appwriteEndpoint)
      .setProject(appwriteConfig.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // wrapper method
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
      );
      if (userAccount) {
        // call another method that you create
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // other methods here next
}

const authService = new AuthService();

export default authService;
```

# Login

After an account is created, users can be logged in using the Create Email Session route.

```javascript
async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }
```

# GetCurrentUser

When user directly go to home route we need to check is user exist or not ,who is present there

```javascript
async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null;
    }
```

# Logout

Delete session is actually logout in appwrite.

```javascript
async Logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
```

# Databases

- The Databases service allows you to create structured collection of documents, query and filter lists of documents, and manage an advanced set of read and write access permissions.

## Create document

```javascript
async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument  (
                databaseId = appwriteConfig.appwriteDatabaseID,
                collectionId = appwriteConfig.appwriteCollectionId,
                documentId = slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error;
        }
    }
```

## update document

```javascript
async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }
```

## delete post

```javascript
async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }
```

## get post

```javascript
async getPost(slug){
        try {
            return await this.databases.getDocument(
                appwriteConfig.appwriteDatabaseID,
                appwriteConfig.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
            return false
        }
    }
```

## upload file

```javascript
async uploadFile(file){
        try {
            return await this.storage.createFile(
                appwriteConfig.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
            return false
        }
    }
```

## delete file

```javascript
async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                appwriteConfig.appwriteStorageId,
                fileId
            )
        } catch (error) {
            throw error
            return false
        }
    }
```

## get file preview

```javascript
async getFilePreview(fileId){
        return this.storage.getFilePreview(
            appwriteConfig.appwriteStorageId,
            fileId
        )
    }
```

---

## Recent Commits (after 12:00 PM)

The following commits were made after 12 PM today. Each entry includes the commit hash, original commit message, a brief description of the code change, and a short note on what was learned or why the change matters.

| Commit | Message | Summary |
|--------|---------|---------|
| `329ea4a` | add missing exports for Container, Logo, and LogoutButton components | Exported `Container`, `Logo`, and `LogoutButton` from `src/Components/index.js` to simplify imports across the app. |
| `0c799b2` | fix Input component syntax error | Fixed JSX syntax errors in `Input.jsx`, ensuring the component renders correctly. |
| `2dfdb1b` | add Button component for reusable button functionality | Created a reusable `Button` component for consistent UI actions. |
| `ffb1358` | add Input component for user input handling | Implemented `Input` component to capture user text input. |
| `6a0917e` | add LogoutButton component for user logout functionality | Added `LogoutButton` with logout logic tied to Redux auth slice. |
| `2577854` | add Footer component with layout, branding, and navigation links | Built `Footer` component containing site navigation and branding. |
| `4c86435` | add Container component for layout structure | Introduced `Container` component to provide a consistent page layout wrapper. |
| `c79ad68` | add Logo component for branding display | Added `Logo` component for brand representation in the header/footer. |
| `e3f09a1` | add Header component with navigation and authentication handling | Developed `Header` with navigation links and authentication state handling. |

**Key takeaways**

- Centralising component exports in `src/Components/index.js` reduces import boilerplate and improves maintainability.
- Incremental component creation (Header, Footer, Container, etc.) clarifies the UI structure and encourages reusable design.
- Consistent use of Redux Toolkit for auth state simplifies login/logout flows across components.
- Small syntax fixes (e.g., JSX errors) can block rendering; thorough linting and type checking help catch them early.

*To view a full commit log, run:* `git log --since="12:00" --pretty=format:"%h %ad %s" --date=local`
