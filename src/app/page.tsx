import cookies from "../../public/cookies.json"

function CookieRecipe({recipe}) {
    return (<div className="bg-blue-100 basis-1/3-gap-4 min-w-[400px] min-h-72 flex items-center flex-col justify-center">
        <img className={"p-8 w-[300px] h-[300px]"} src={recipe.image_name ?? ""} alt={""} />
        <a className="p-8 font-bold text-2xl text-center" href={recipe.source}>{recipe.recipe_name}</a>
        <div className="w-[100%] bg-amber-400 mt-auto text-center font-bold p-2">Show Recipe</div>
    </div>);
}

export default function Home() {

  console.log(cookies);

  return (
      <>

          <main className="flex min-h-screen flex-col items-center justify-between p-24 md:container ml-auto mr-auto">
              <label>Cakiness / Chewiness</label>
              <input type="range"/>
              <label>Sweetness</label>
              <input type="range"/>
              <label>Richness</label>
              <input type="range"/>

              <div className="cookie-container flex flex-wrap gap-4">

                  {cookies.recipes.map((recipe, index) => {
                      return <CookieRecipe key={`cookie-recipe-${index}`} recipe={recipe}/>
                  })}
              </div>
          </main>
          <footer className="ml-auto w-[100%] flex bg-gray-200 place-content-center pt-1 pb-1 pr-2">
              <a href="mailto:noahreppert95@gmail.com"><span className="font-bold">Email:</span> noahreppert95@gmail.com</a>
          </footer>
      </>
  )
}
