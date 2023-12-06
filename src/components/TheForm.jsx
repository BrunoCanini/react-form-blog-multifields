import { useState } from "react"

export default function TheForm(){


    const initialFormData = {
        title: "",
        image: "",
        content: "",
        category: "",
        tags: []
    }

    const [postList, setPostList] = useState([]);

    const [formData, setFormData] = useState(initialFormData)

    function updateFormData(newValue, keyPosition, checked=false){
        // clono l oggetto fromData
        // usiamo lo spread per togliere quealsiasi riferimento allo state attuale
        const newFormData = {...formData};
        // aggiorno la chiave
        if(keyPosition === "tags"){
            if(checked)
            newFormData[keyPosition].push(newValue)
            else{
                const check = newFormData[keyPosition].indexOf(newValue)
                newFormData[keyPosition].splice(check, 1)
            }
            
        }else{
            newFormData[keyPosition] = newValue;
        }
        // passo l oggetto modificato al setFormData
        setFormData(newFormData);
        console.log(formData.tags)
    }

    function handleFormSubmit(e){
        // leviamo il refresh del form
        e.preventDefault();
        // aggiungiamo il post
        const newPostList = [ ...postList, formData];
        // resetto il form
        setPostList(newPostList);
        setFormData(initialFormData);
    }

    function removePost(i){
        
        const newPostList = [...postList]

        newPostList.splice(i, 1)

        setPostList(newPostList)
    }

    return(

            <div className="container mx-auto pt-10 w-[600px]">
                <h1 className="text-center font-bold"> FORM </h1>

                <form className="flex flex-col gap-4 mx-auto pt-10" action="" onSubmit={handleFormSubmit}>

                    <label className="block font-medium mb-2" htmlFor="title">Titolo</label>
                    <input className="border p-4" type="text" id="title" name="title" placeholder="Insert title" 
                        value={formData.title}
                        onChange={(e) => updateFormData(e.target.value, 'title')}       
                    />

                    <label className="block font-medium mb-2" htmlFor="image">Image</label>
                    <input className="border p-4" type="file" id="image" name="image"
                        value={formData.image}
                        onChange={(e) => updateFormData(e.target.value, 'image')}       
                    />

                    <label className="block font-medium mb-2" htmlFor="content">Content</label>
                    <textarea className="border p-4"  id="content" name="content" placeholder="Content..." 
                        value={formData.content}
                        onChange={(e) => updateFormData(e.target.value, 'content')}       
                    />

                    <label className="block font-medium mb-2" htmlFor="content">Category</label>
                    <select name="category" id="category"
                        value={formData.category}
                        onChange={(e) => updateFormData(e.target.value, 'category')}>

                        <option value="Training">Training</option>
                        <option value="Game">Game</option>
                        <option value="Sport">Sport</option>
                        <option value="Gossip">Gossip</option>

                    </select>

                    <fieldset>
                    <legend className="font-medium mb-2">Choose Tags:</legend>

                        <div>
                            <input type="checkbox" id="html" name="html"
                                value="scalses"
                                onChange={(e) => updateFormData(e.target.value, 'tags', e.target.checked)} />
                            <label htmlFor="html">Html</label>
                        </div>

                        <div>
                            <input type="checkbox" id="css" name="css"
                                value="css"
                                onChange={(e) => updateFormData(e.target.value, 'tags', e.target.checked)} />
                            <label htmlFor="css">Css</label>
                        </div>

                        <div>
                            <input type="checkbox" id="js" name="js"
                                value="js"
                                onChange={(e) => updateFormData(e.target.value, 'tags', e.target.checked)} />
                            <label htmlFor="js">Js</label>
                        </div>

                        <div>
                            <input type="checkbox" id="sass" name="sass"
                                value="sass"
                                onChange={(e) => updateFormData(e.target.value, 'tags', e.target.checked)} />
                            <label htmlFor="sass">Sass</label>
                        </div>

                    </fieldset>
                    
                    <button className=" w-[100px] p-3 bg-blue-400 hover:bg-blue-600 text-white">Submit</button>
                </form>

                <hr className="my-10"/>

                <div className="mt-10">

                {postList.length > 0 ? (
                    
                        <div className="flex flex-col gap-3 border">
                            {postList.map((post, i) => (
                                <div key={i}>
                                    <h1>TITLE: {post.title}</h1>
                                    <p>CONTENT: {post.content}</p>
                                    <img src={post.image} alt="" />
                                    <p>CATEGORY: {post.category}</p>
                                    <h3>TAGS:
                                        {post.tags.map((tag) => (
                                            <li>{tag}</li>
                                        ))}
                                    </h3>
                                    <button className="p-1 bg-red-500 text-white mt-5"
                                    onClick={() => removePost(i)}>Delete</button>

                                </div>
                            ))}

                        </div>
                    ) : (
                    <h2 className="text-center">Non sono presenti elementi nel menù</h2>
                    )}

                </div>

            </div>

    )
}