package de.bht.mme2.waswaechstwann.server.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import de.bht.mme2.waswaechstwann.server.dao.RecipeDAO;
import de.bht.mme2.waswaechstwann.server.pojos.Recipe;
import de.bht.mme2.waswaechstwann.server.pojos.Recipes;

@Path("recipeREST")
public class RecipeRessource {

	/**
	 * Example-JSON can be found under rezept.txt
	 * 
	 * @param recipe
	 *            the recipe to add to the MongoDB
	 * @return the confirmation that the recipe has been added
	 */
	@Path("/addRecipe")
	@POST
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.TEXT_PLAIN })
	public String create(final Recipe recipe) {
		new RecipeDAO().addRecipe(recipe);
		return "Added recipe: \n" + recipe;
	}

	/**
	 * Finds all recipes containing(!) the given fruitname in the
	 * ingridientslist
	 * 
	 * @param fruit
	 *            the String the recipe-fruitingridient should contain
	 * @return the recipe
	 */
	@Path("/findByFruit/{fruit}")
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public JSONObject find(@PathParam("fruit") final String fruit) {

		final JSONArray recipes = new RecipeDAO().findRecipeHasFruit(fruit);

		try {
			return new JSONObject().put("recipes", recipes);
		} catch (final JSONException e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}

	}

	/**
	 * @return all Fruits in the MongoDB
	 */
	@Path("/list")
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public JSONObject list() {

		final JSONArray array = new RecipeDAO().getAllRecipes();

		try {
			return new JSONObject().put("recipes", array);
		} catch (final JSONException e) {
			e.printStackTrace();
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		}

	}

	/**
	 * 
	 * @param recipes the recipes to add to the Database
	 * @return a String that says what recipes have been added
	 */
	@Path("/addAll")
	@POST
	@Produces({ MediaType.APPLICATION_JSON })
	public String addAll(Recipes recipes) {

		String returnValue = "";

		for (final Recipe gem : recipes.getRecipes()) {
			returnValue += create(gem);
		}

		return returnValue;
	}
	
	  /**
	    * cleans the Recipe-Table (deletes all entries! be careful!)
	 * @return 
	    */
	   @Path("/clean")
	   @GET
	   @Produces({ MediaType.APPLICATION_JSON })
	   public boolean clean() {

	      new RecipeDAO().clean();
	      return true;
	   }

}
