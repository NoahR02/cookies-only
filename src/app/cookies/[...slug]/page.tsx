import {notFound} from "next/navigation";
import {get_recipes, Recipe, RecipeMetrics} from "@/cookie_utils"

interface TableProps {
    label: string,
    amount: number | undefined,
    measurement?: string
}

const TableRow = ({label, amount, measurement = "g"}: TableProps) => {
    if((typeof(amount) == "number" && amount == 0) || !amount) {
        return null;
    }

    return(
    <tr>
        <td>
            {label}
        </td>
        <td>
            {amount}{measurement}
        </td>
    </tr>
    );

}

export default function Page({params}: { params: { slug: string } }) {
    if (params.slug.length != 2) {
        notFound();
    }
    const source_name: string = decodeURI(params.slug[0]);
    const recipe_name: string = decodeURI(params.slug[1]);

    let cookies = get_recipes();

    let recipe: Recipe | undefined;
    for (let i: number = 0; i < cookies.length; ++i) {
        let current_recipe = cookies[i];
        if(current_recipe.recipe_name == recipe_name && current_recipe.source_name == source_name) {
            recipe = current_recipe;
            break;
        }
    }

    if(!recipe) {
        notFound();
    }
    let cake_flour = recipe.cake_flour ?? 0;
    let bread_flour = recipe.bread_flour ?? 0;
    let all_purpose_flour = recipe.all_purpose_flour ?? 0;
    let light_brown_sugar = recipe.light_brown_sugar ?? 0;
    let dark_brown_sugar = recipe.dark_brown_sugar ?? 0;
    let white_sugar = recipe.white_sugar ?? 0;
    let baking_soda = recipe.baking_soda ?? 0;
    let baking_powder = recipe.baking_powder ?? 0;
    let eggs = recipe.eggs ?? 0;
    let egg_yolks = recipe.egg_yolks ?? 0;
    let milk = recipe.milk ?? 0;
    let butter = recipe.butter ?? 0;
    let browned_butter = recipe.brown_butter ?? 0;

    const total_flour = cake_flour + bread_flour + all_purpose_flour;
    const total_sugar = light_brown_sugar + dark_brown_sugar + white_sugar;
    const total_leavening = baking_soda + baking_powder;
    const total_protein = (bread_flour * 0.127) + (all_purpose_flour * 0.117) + (cake_flour * 0.1) + (eggs * 0.12) + (egg_yolks * 0.15882) + (milk * 0.03333);
    const total_fat = (butter * 0.8) + (egg_yolks * 0.26471) +  (milk * 0.03333) + (browned_butter * 0.8);

    const recipe_metrics: RecipeMetrics = {
        total_flour: total_flour,
        total_sugar: total_sugar,
        total_leavening: total_leavening,
        total_protein: total_protein,
        total_fat: total_fat
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24 md:container ml-auto mr-auto">
                <div>
                    <div className="header flex flex-col place-items-center">
                        <img className={"p-8 w-[300px] h-[300px]"} src={`/${recipe.image_name}`} alt={""}/>
                        <a target="_blank" className="p-2 pl-8 pr-8 font-bold text-2xl text-center"
                           href={recipe.source}>{recipe.recipe_name}</a>
                        <div className="mb-10 text-gray-500 text-center">By: {recipe.source_name}</div>
                    </div>

                    <table className="table-auto w-[100%]">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-black">Ingredient Name:</th>
                                <th className="border-b-2 border-black">Amount</th>
                                <th className="border-b-2 border-black min-w-1">Bakers %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRow label="Cake Flour" amount={recipe.cake_flour} />
                            <TableRow label="All Purpose Flour" amount={recipe.all_purpose_flour} />
                            <TableRow label="Bread Flour" amount={recipe.bread_flour} />
                            <TableRow label="Baking Soda" amount={recipe.baking_soda} />
                            <TableRow label="Baking Powder" amount={recipe.baking_powder} />
                            <TableRow label="Butter" amount={recipe.butter} />
                            <TableRow label="Brown Butter" amount={recipe.brown_butter} />
                            <TableRow label="White Sugar" amount={recipe.white_sugar} />
                            <TableRow label="Light Brown Sugar" amount={recipe.light_brown_sugar} />
                            <TableRow label="Dark Brown Sugar" amount={recipe.dark_brown_sugar} />
                            <TableRow label="Eggs" amount={recipe.eggs} />
                            <TableRow label="Egg Yolks" amount={recipe.egg_yolks} />
                            <TableRow label="Vanilla Extract" amount={recipe.vanilla_extract} />
                            <TableRow label={`Salt(${recipe.salt_size})`} amount={recipe.salt} />
                            <TableRow label="Chocolate" amount={recipe.chocolate} />
                            <TableRow label="Cookie Size" amount={recipe.cookie_size} />
                            <TableRow label="Min Bake Time" amount={recipe.min_bake_time} measurement={" minutes"} />
                            <TableRow label="Max Bake Time" amount={recipe.max_bake_time} measurement={" minutes"} />
                            <TableRow label="Bake Temp" amount={recipe.bake_temp} measurement={" ℉"} />
                            <TableRow label="Ice" amount={recipe.ice} />
                            <TableRow label="Milk" amount={recipe.milk} />
                            <TableRow label="Corn Starch" amount={recipe.corn_starch} />
                        </tbody>
                    </table>
                </div>
            </main>
            <footer className="ml-auto w-[100%] flex bg-gray-100 place-content-center pt-1 pb-1 pr-2">
                <a href="mailto:noahreppert95@gmail.com"><span
                    className="font-bold">Email:</span> noahreppert95@gmail.com</a>
            </footer>
        </>
    )
}