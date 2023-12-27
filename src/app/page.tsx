import {get_recipes} from "@/cookie_utils";

function CookieRecipe({recipe}) {
    return (
        <div className="bg-blue-100 basis-1/3-gap-4 min-w-[400px] min-h-72 flex items-center flex-col justify-center">
            <img className={"p-8 w-[300px] h-[300px]"} src={recipe.image_name ?? ""} alt={""}/>
            <a target="_blank" className="p-2 pl-8 pr-8 font-bold text-2xl text-center"
               href={recipe.source}>{recipe.recipe_name}</a>
            <div className="mb-10 text-gray-500">By: {recipe.source_name}</div>

            <div className="mb-10 w-[80%] min-w-[300px] max-w-[100%] pl-8 pr-8">
                <div className="flex items-center w-[100%] gap-10">
                    <label className="w-[150px]">Sweetness</label>
                    <div className="relative border-[1px] border-gray-300 rounded w-[100%] bg-gray-50 h-[10px]">
                        <span className="absolute block ml-auto bg-red-600 rounded w-[50%] h-[10px]"></span>
                    </div>
                </div>

                <div className="flex items-center w-[100%] gap-10">
                    <label className="w-[150px]">Cakey</label>
                    <div className="relative border-[1px] border-gray-300 rounded w-[100%] bg-gray-50 h-[10px]">
                        <span className="absolute block ml-auto bg-blue-600 rounded w-[50%] h-[10px]"></span>
                    </div>
                </div>
            </div>

            <div className="mt-auto w-[100%] bg-amber-400 mt-auto text-center font-bold p-2"><a
                href={`/cookies/${recipe.source_name}/${recipe.recipe_name}`}>More Details</a></div>
        </div>);
}

export default function Home() {
    let cookies = get_recipes();
    return (
        <>

            <main className="flex min-h-screen flex-col items-center justify-between p-24 md:container ml-auto mr-auto">

              <div className="flex gap-20">
                  <div>
                      <label>Cakiness / Chewiness</label>
                      <input className="accent-red-600" type="range"/>
                  </div>
                  <div>
                      <label>Sweetness</label>
                      <input className="accent-red-600" type="range"/>
                  </div>
                  <div>
                      <label>Richness</label>
                      <input className="accent-red-600" type="range"/>
                  </div>
              </div>

              <div className="cookie-container flex flex-wrap gap-4">

                  {cookies.map((recipe, index) => {
                      return <CookieRecipe key={`cookie-recipe-${index}`} recipe={recipe}/>
                  })}
              </div>
          </main>
      </>
  )
}
