
package de.bht.mme2.waswaechstwann.server.pojos;

import java.util.Date;


/**
  * 
  * @generated
  */

public class Fruit  {
  	
  	
  	 String name ;
  	 String description ;
  	 Date seasonbegin ;
  	 Date seasonend ;
	
    /**
      * Standard Constructor with all needed attributes
      */
    public Fruit( String name,  String description,  Date seasonbegin,  Date seasonend ) {
    	this.name = name;
    	this.description = description;
    	this.seasonbegin = seasonbegin;
    	this.seasonend = seasonend;
    }
    
    
    /**
      * Empty Constructor
      */
    public Fruit() {
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
	  * @return the description
	  */
	public String getDescription() {			
		return this.description;
	}
	
	/**
	  * @param description 
	  *			the description to set
	  */
	public void setDescription( String description ) {
		this.description = description;
	}
	
	/**
	  * @return the seasonbegin
	  */
	public Date getSeasonbegin() {			
		return this.seasonbegin;
	}
	
	/**
	  * @param seasonbegin 
	  *			the seasonbegin to set
	  */
	public void setSeasonbegin( Date seasonbegin ) {
		this.seasonbegin = seasonbegin;
	}
	
	/**
	  * @return the seasonend
	  */
	public Date getSeasonend() {			
		return this.seasonend;
	}
	
	/**
	  * @param seasonend 
	  *			the seasonend to set
	  */
	public void setSeasonend( Date seasonend ) {
		this.seasonend = seasonend;
	}
	
    
    
    @Override
    public String toString() {
    	return "Fruit [ name = " +  name + ", description = " +  description + ", seasonbegin = " +  seasonbegin + ", seasonend = " +  seasonend+ "]"  ;
    }
}
