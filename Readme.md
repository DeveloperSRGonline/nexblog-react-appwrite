# Nexblog 
## An blog uploding application

### Tech stack
``` javascript
- React
- Appwrite
- React-Router-Dom
- TinyMCE 
- HTML-React-Parser
```
--- 
*Features*

=> Login to see posts on home page  
=> Footer  
=> Home  
=> Login  ---|  
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

`Project create`  
    - `Auth`   
    - `Database`   
`____`- `Articles`  
`________`- `Documents[row]`  
`________`- `attributes[columns]`  
    - `Storage`  
    - `Functions`


* Variables prefixed with VITE_ will be exposed in client-side source code after Vite bundling.

# Env Variables

Vite exposes env variables under the `import.meta.env` object as strings automatically.

Variables prefixed with `VITE_` will be exposed in client-side source code after Vite bundling. To prevent accidentally leaking env variables to the client, avoid using this prefix. As an example, consider the following:

## `.env`

```env
VITE_SOME_KEY=123
DB_PASSWORD=foobar
````

The parsed value of `VITE_SOME_KEY` – `"123"` – will be exposed on the client, but the value of `DB_PASSWORD` will not. You can test this by adding the following to your code:

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```