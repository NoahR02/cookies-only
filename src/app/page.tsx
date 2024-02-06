"use client";

import { get_recipes, Recipe, RecipeMetrics, scale_recipe } from "@/cookie_utils";
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { X } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

function SelectedCookieDetails() {

    const searchParams = useSearchParams();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const current_recipe_id = current.get("currentRecipe") ?? "0";

    let [scale, set_scale] = useState(1);

    let recipes = get_recipes();
    const recipe = scale_recipe(recipes.get(current_recipe_id) ?? recipes.values().next().value, scale);

    const Ingredient = ({ name, amount }: { name: string, amount: number }) => {

        if (amount <= 0.0) {
            return null;
        }

        return (
            <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>{amount.toFixed(2)} g</TableCell>
                <TableCell>{((amount / recipe.metrics!.total_flour) * 100).toFixed(2)}%</TableCell>
            </TableRow>
        )
    }

    return (
        <div className="bg-white flex flex-col w-[100%]"
        >
            <div className="flex items-center mt-5 mb-5 ml-auto">
                <div className="text-left p-5">Scale</div>
                <input className="text-left border-2 border-black p-2 max-w-[120px] rounded" value={scale} onChange={(e) => set_scale(parseFloat(e.target.value) ?? "")} step={0.5} type="number" />
            </div>

            <Table className="w-[100%]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Ingredient Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Bakers %</TableHead>
                    </TableRow>
                </TableHeader>

                <Ingredient name="Cake Flour" amount={recipe.cake_flour} />
                <Ingredient name="All Purpose Flour" amount={recipe.all_purpose_flour} />
                <Ingredient name="Bread Flour" amount={recipe.bread_flour} />
                <Ingredient name="Baking Soda" amount={recipe.baking_soda} />
                <Ingredient name="Baking Powder" amount={recipe.baking_powder} />
                <Ingredient name="Butter" amount={recipe.butter} />
                <Ingredient name="Brown Butter" amount={recipe.brown_butter} />
                <Ingredient name="White Sugar" amount={recipe.white_sugar} />
                <Ingredient name="Light Brown Sugar" amount={recipe.light_brown_sugar} />
                <Ingredient name="Dark Brown Sugar" amount={recipe.dark_brown_sugar} />
                
                {recipe.eggs <= 0.0 ? null : <TableRow><TableCell>Eggs</TableCell><TableCell>{recipe.eggs} egg(s)</TableCell></TableRow>}
                {recipe.egg_yolks <= 0.0 ? null : <TableRow><TableCell>Egg Yolks</TableCell><TableCell>{recipe.egg_yolks} egg yolk(s)</TableCell></TableRow> }

                <Ingredient name="Vanilla Extract" amount={recipe.vanilla_extract} />
                <Ingredient name={`Salt(${recipe.salt_size})`} amount={recipe.salt} />
                <Ingredient name="Chocolate" amount={recipe.chocolate} />
                <Ingredient name="Cookie Size" amount={recipe.cookie_size} />
                <Ingredient name="Corn Starch" amount={recipe.corn_starch} />
                <Ingredient name="Ice" amount={recipe.ice} />
                <Ingredient name="Milk" amount={recipe.milk} />

                <TableRow><TableCell>Min Bake Time</TableCell><TableCell>{recipe.min_bake_time} minutes</TableCell></TableRow>
                <TableRow><TableCell>Max Bake Time</TableCell><TableCell>{recipe.max_bake_time} minutes</TableCell></TableRow>
                <TableRow><TableCell>Bake Temp</TableCell><TableCell>{recipe.bake_temp} ℉</TableCell></TableRow>

            </Table>
        </div>
    )
        ;
}

export default function Home() {

    let cookies = get_recipes();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <main className="w-[100%] flex flex-col">

            <div className="bg-gray-100 min-h-[500px] flex flex-col items-center justify-center p-10 text-center">
                <h2 className="text-4xl sm:text-6xl text-bold">Discover some of the most delicious cookie recipes.</h2>
                <h2 className="mt-10 text-2xl text-gray-600">Recipes are in grams for convenience and accuracy.</h2>
            </div>

            <div className="mt-20 mb-20 grid gap-10 sm:grid-cols-1 md:grid-cols-auto-width container w-[100%]">

                {Array.from(cookies.entries()).map(([recipe_id, recipe], index) => {

                    return (
                        <Dialog key={index}>

                            <DialogTrigger>
                                <Card className="md:max-w-[400px] max-w-[100%] h-[100%]"

                                    key={`cookie-recipe-${recipe_id}`}
                                    onClick={() => {

                                        const current = new URLSearchParams(Array.from(searchParams.entries()));
                                        current.set("currentRecipe", recipe_id);
                                        const query = `?${current.toString()}`;

                                        router.replace(`${pathname}${query}`);
                                    }}>

                                    <CardHeader>
                                        <CardTitle>{recipe.recipe_name}</CardTitle>
                                        <CardDescription>By: {recipe.source_name}</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <Image width={300} height={300} className={"p-8 ml-auto mr-auto"} src={"/" + recipe.image_name ?? ""} alt={""} />
                                    </CardContent>
                                </Card>
                            </DialogTrigger>

                            <DialogContent className="max-h-[80%] overflow-y-scroll">
                            
                            <DialogClose className="w-4 h-4 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogClose>

                                <DialogHeader className="max-h-fit">
                                    <DialogTitle>{recipe.recipe_name}</DialogTitle>
                                    <DialogDescription>By: {recipe.source_name}</DialogDescription>
                                    <SelectedCookieDetails />
                                </DialogHeader>
                            </DialogContent>

                        </Dialog>
                    );

                })}
            </div>

        </main>
    )
}
