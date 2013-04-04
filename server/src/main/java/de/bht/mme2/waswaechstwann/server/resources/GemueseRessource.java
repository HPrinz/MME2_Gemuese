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

import de.bht.mme2.waswaechstwann.server.dao.VegetableDAO;
import de.bht.mme2.waswaechstwann.server.pojos.Fruit;

/**
 * Example Services available on:
 * 
 * http://127.0.0.1:9090/gemuese/gemueseREST/avocado PUT
 * http://127.0.0.1:9090/gemuese/gemueseREST/avocado GET
 * http://127.0.0.1:9090/gemuese/gemueseREST/list GET
 */

@Path("gemueseREST")
public class GemueseRessource {

   /**
    * Example-JSON can be found under example.json
    * 
    * @param fruit
    *           the fruit to add to the MongoDB
    * @return the confirmation that the fruit has been added
    */
   @Path("/addFruit")
   @POST
   @Consumes({ MediaType.APPLICATION_JSON })
   @Produces({ MediaType.TEXT_PLAIN })
   public String create(final Fruit fruit) {
      new VegetableDAO().addVegetable(fruit);
      return "Added vegetable: \n" + fruit;
   }

   /**
    * Finds all fruits containing(!) the given String
    * 
    * @param fruit
    *           the String the fruit should contain
    * @return the fruits containing the String as a JSONArray in a JSONObject
    *         called "fruit"
    */
   @Path("/find/{fruit}")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public JSONObject find(@PathParam("fruit") final String fruit) {

      final JSONArray array = new VegetableDAO().findFruit(fruit);

      try {
         return new JSONObject().put("fruits", array);
      } catch (final JSONException e) {

         e.printStackTrace();
      }

      throw new WebApplicationException(Response.Status.NOT_FOUND);
   }

   /**
    * @return all Fruits in the MongoDB
    */
   @Path("/list")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public JSONObject list() {

      final JSONArray array = new VegetableDAO().getAllFruits();

      try {
         return new JSONObject().put("fruits", array);
      } catch (final JSONException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }

      throw new WebApplicationException(Response.Status.NOT_FOUND);
   }

   /**
    * cleans the Fruit-Table (deletes all entries! be careful!)
    */
   @Path("/clean")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public void clean() {

      new VegetableDAO().clean();
   }

   /**
    * TODO
    */
   // @Path("/init")
   // @GET
   // @Produces({ MediaType.APPLICATION_JSON })
   // public String init() {
   // String header = "All Vegetables: \n";
   //
   // for (final Fruit gem : allVegetables) {
   // header += "\n" + gem;
   // }
   //
   // return header;
   // }
}