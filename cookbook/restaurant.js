(function() {
    "use strict";

    const recipes = $("input[name='inlineRadioOptions']");
    const recipeName = $('#recipeName');
    const recipeImage = $('#recipeImage');
    const recipeIngredients = $('#recipeIngredients');
    const errorElem = $('#error');
    const recipeDetails = $('#recipe').hide();


    recipes.change(() => {
        const checked = $("input[name='inlineRadioOptions']:checked").val();

        fetch(`${checked}.json`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} ${r.statusText}`);
                }
                return r.json();
            })
            .then(details => {
                recipeDetails.show();
                recipeName.text(details.name);
                recipeImage.attr('src', details.image);
                // recipeIngredients.text(details.ingredients);
                const ingredients = details.ingredients;
                ingredients.forEach(element => {
                    recipeIngredients.append(element + '<br>');
                });
            })
            .catch(e => {
                errorElem.text(e.message);
            });
        recipeIngredients.empty();
    });

}());