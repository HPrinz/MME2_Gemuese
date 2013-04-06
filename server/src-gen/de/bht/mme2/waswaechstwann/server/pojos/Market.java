
package de.bht.mme2.waswaechstwann.server.pojos;

import java.util.Date;


/**
  * 
  * @generated
  */

public class Market  {
  	
  	
  	 String name ;
  	 String address ;
  	 Date latitude ;
  	 Date longitude ;
  	 String openingHous ;
	
    /**
      * Standard Constructor with all needed attributes
      */
    public Market( String name,  String address,  Date latitude,  Date longitude,  String openingHous ) {
    	this.name = name;
    	this.address = address;
    	this.latitude = latitude;
    	this.longitude = longitude;
    	this.openingHous = openingHous;
    }
    
    
    /**
      * Empty Constructor
      */
    public Market() {
    }
    
    
	/**
	  * @return the name
	  */
	public String getName() {			
		return this.name;
	}
	
	/**
	  * @param name 
	  *			the name to set
	  */
	public void setName( String name ) {
		this.name = name;
	}
	
	/**
	  * @return the address
	  */
	public String getAddress() {			
		return this.address;
	}
	
	/**
	  * @param address 
	  *			the address to set
	  */
	public void setAddress( String address ) {
		this.address = address;
	}
	
	/**
	  * @return the latitude
	  */
	public Date getLatitude() {			
		return this.latitude;
	}
	
	/**
	  * @param latitude 
	  *			the latitude to set
	  */
	public void setLatitude( Date latitude ) {
		this.latitude = latitude;
	}
	
	/**
	  * @return the longitude
	  */
	public Date getLongitude() {			
		return this.longitude;
	}
	
	/**
	  * @param longitude 
	  *			the longitude to set
	  */
	public void setLongitude( Date longitude ) {
		this.longitude = longitude;
	}
	
	/**
	  * @return the openingHous
	  */
	public String getOpeningHous() {			
		return this.openingHous;
	}
	
	/**
	  * @param openingHous 
	  *			the openingHous to set
	  */
	public void setOpeningHous( String openingHous ) {
		this.openingHous = openingHous;
	}
	
    
    
    @Override
    public String toString() {
    	return "Market [ name = " +  name + ", address = " +  address + ", latitude = " +  latitude + ", longitude = " +  longitude + ", openingHous = " +  openingHous+ "]"  ;
    }
}
