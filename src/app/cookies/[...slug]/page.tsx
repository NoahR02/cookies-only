import {notFound} from "next/navigation";
import {get_recipes, Recipe, RecipeMetrics} from "@/cookie_utils"

interface TableProps {
    label: string,
    amount: number | undefined,
    measurement?: string,
    metrics: RecipeMetrics | undefined,
}

const TableRow = ({label, amount, measurement = "g", metrics}: TableProps) => {
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
            { metrics && !(["minutes", "℉"].includes(measurement.trim()))  ?
            <td>
                { ((amount / metrics.total_flour) * 100).toFixed(2)}%
            </td>
            : null }
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
                                <th className="border-b-2 border-black text-left">Ingredient Name</th>
                                <th className="border-b-2 border-black text-left">Amount</th>
                                <th className="border-b-2 border-black min-w-1 text-left">Bakers %</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableRow label="Cake Flour" amount={recipe.cake_flour} metrics={recipe.metrics} />
                            <TableRow label="All Purpose Flour" amount={recipe.all_purpose_flour} metrics={recipe.metrics} />
                            <TableRow label="Bread Flour" amount={recipe.bread_flour} metrics={recipe.metrics} />
                            <TableRow label="Baking Soda" amount={recipe.baking_soda} metrics={recipe.metrics} />
                            <TableRow label="Baking Powder" amount={recipe.baking_powder} metrics={recipe.metrics} />
                            <TableRow label="Butter" amount={recipe.butter} metrics={recipe.metrics} />
                            <TableRow label="Brown Butter" amount={recipe.brown_butter} metrics={recipe.metrics} />
                            <TableRow label="White Sugar" amount={recipe.white_sugar} metrics={recipe.metrics} />
                            <TableRow label="Light Brown Sugar" amount={recipe.light_brown_sugar} metrics={recipe.metrics} />
                            <TableRow label="Dark Brown Sugar" amount={recipe.dark_brown_sugar} metrics={recipe.metrics} />
                            <TableRow label="Eggs" amount={recipe.eggs} metrics={recipe.metrics} />
                            <TableRow label="Egg Yolks" amount={recipe.egg_yolks} metrics={recipe.metrics} />
                            <TableRow label="Vanilla Extract" amount={recipe.vanilla_extract} metrics={recipe.metrics} />
                            <TableRow label={`Salt(${recipe.salt_size})`} amount={recipe.salt} metrics={recipe.metrics} />
                            <TableRow label="Chocolate" amount={recipe.chocolate} metrics={recipe.metrics} />
                            <TableRow label="Cookie Size" amount={recipe.cookie_size} metrics={recipe.metrics} />
                            <TableRow label="Min Bake Time" amount={recipe.min_bake_time} measurement={" minutes"} metrics={recipe.metrics} />
                            <TableRow label="Max Bake Time" amount={recipe.max_bake_time} measurement={" minutes"} metrics={recipe.metrics} />
                            <TableRow label="Bake Temp" amount={recipe.bake_temp} measurement={" ℉"} metrics={recipe.metrics} />
                            <TableRow label="Ice" amount={recipe.ice} metrics={recipe.metrics} />
                            <TableRow label="Milk" amount={recipe.milk} metrics={recipe.metrics} />
                            <TableRow label="Corn Starch" amount={recipe.corn_starch} metrics={recipe.metrics} />
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}