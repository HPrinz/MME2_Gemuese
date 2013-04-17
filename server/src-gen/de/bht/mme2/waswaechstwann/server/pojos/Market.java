
package de.bht.mme2.waswaechstwann.server.pojos;



/**
  * 
  * @generated
  */

public class Market  {
  	
  	
  	 String name ;
  	 String address ;
  	 double latitude ;
  	 double longitude ;
  	 String openingHours ;
  	 String type ;
	
    /**
      * Standard Constructor with all needed attributes
      */
    public Market( String name,  String address,  double latitude,  double longitude,  String openingHours,  String type ) {
    	this.name = name;
    	this.address = address;
    	this.latitude = latitude;
    	this.longitude = longitude;
    	this.openingHours = openingHours;
    	this.type = type;
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
	public double getLatitude() {			
		return this.latitude;
	}
	
	/**
	  * @param latitude 
	  *			the latitude to set
	  */
	public void setLatitude( double latitude ) {
		this.latitude = latitude;
	}
	
	/**
	  * @return the longitude
	  */
	public double getLongitude() {			
		return this.longitude;
	}
	
	/**
	  * @param longitude 
	  *			the longitude to set
	  */
	public void setLongitude( double longitude ) {
		this.longitude = longitude;
	}
	
	/**
	  * @return the openingHours
	  */
	public String getOpeningHours() {			
		return this.openingHours;
	}
	
	/**
	  * @param openingHours 
	  *			the openingHours to set
	  */
	public void setOpeningHours( String openingHours ) {
		this.openingHours = openingHours;
	}
	
	/**
	  * @return the type
	  */
	public String getType() {			
		return this.type;
	}
	
	/**
	  * @param type 
	  *			the type to set
	  */
	public void setType( String type ) {
		this.type = type;
	}
	
    
    
    @Override
    public String toString() {
    	return "Market [ name = " +  name + ", address = " +  address + ", latitude = " +  latitude + ", longitude = " +  longitude + ", openingHours = " +  openingHours + ", type = " +  type+ "]"  ;
    }
}
