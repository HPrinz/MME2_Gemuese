package de.bht.mme2.waswaechstwann.server.resources;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Example Services available on:
 * 
 * http://127.0.0.1:9090/gemuese/gemueseREST/avocado PUT
 * http://127.0.0.1:9090/gemuese/gemueseREST/avocado GET
 * http://127.0.0.1:9090/gemuese/gemueseREST/list GET
 */

@Path("gemueseREST")
public class GemueseRessource {
   public static ArrayList<String> allVegetables = new ArrayList<String>();

   @Path("/{gem}")
   @PUT
   @Produces({ MediaType.APPLICATION_JSON })
   public String create(@PathParam("gem") final String gem) {
      allVegetables.add(gem);
      return "Added vegetable: " + gem;
   }

   @Path("/{gem}")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public String find(@PathParam("gem") final String gem) {
      if (allVegetables.contains(gem)) {
         return "Details on Vegetable " + gem + ": \nHier sollten die Details kommen";
      }

      throw new WebApplicationException(Response.Status.NOT_FOUND);
   }

   @Path("/list")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public String list() {
      String header = "All Vegetables: \n";

      for (final String gem : allVegetables) {
         header += "\n" + gem;
      }

      return header;
   }
}