/*******************************************************************************
 * Sportplaces.org
 * by 42com
 *******************************************************************************/
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

import de.bht.mme2.waswaechstwann.server.dao.MarketDAO;
import de.bht.mme2.waswaechstwann.server.dao.VegetableDAO;
import de.bht.mme2.waswaechstwann.server.pojos.Market;
import de.bht.mme2.waswaechstwann.server.pojos.Markets;

/**
 * @author togomade 14.04.2013
 */

@Path("marketREST")
public class MarketRessource {

   @Path("/addMarket")
   @POST
   @Consumes({ MediaType.APPLICATION_JSON })
   @Produces({ MediaType.TEXT_PLAIN })
   public String create(final Market market) {
      new MarketDAO().addMarket(market);
      return "Added market: \n" + market; //$NON-NLS-1$
   }

   @Path("/find/{market}")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public JSONObject find(@PathParam("market") final String market) {

      final JSONArray array = new MarketDAO().findMarket(market);

      try {
         return new JSONObject().put("market", array); //$NON-NLS-1$
      } catch (final JSONException e) {

         e.printStackTrace();
      }

      throw new WebApplicationException(Response.Status.NOT_FOUND);
   }

   @Path("/list")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public JSONObject list() {

      final JSONArray array = new MarketDAO().getAllMarkets();

      try {
         return new JSONObject().put("market", array); //$NON-NLS-1$
      } catch (final JSONException e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }

      throw new WebApplicationException(Response.Status.NOT_FOUND);
   }

   @Path("/clean")
   @GET
   @Produces({ MediaType.APPLICATION_JSON })
   public boolean clean() {

      new MarketDAO().clean();
      return true;
   }

   /**
    * insert all Vegetables automatically
    */
   @Path("/addAll")
   @POST
   @Produces({ MediaType.APPLICATION_JSON })
   public String addAll(final Markets markets) {

      String returnValue = "";

      for (final Market m : markets.getMarkets()) {
         returnValue += create(m);
      }

      return returnValue;
   }
}
