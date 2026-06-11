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