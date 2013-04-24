
package de.bht.mme2.waswaechstwann.server.pojos;

import de.bht.mme2.waswaechstwann.server.pojos.Season;
import java.util.Date;


/**
  * 
  * @generated
  */

public class Fruit  {
  	
  	
  	 String name ;
  	 boolean vegetable ;
  	 String description ;
  	 Date seasonbegin ;
  	 Date seasonend ;
  	 Season season ;
	
    /**
      * Standard Constructor with all needed attributes
      */
    public Fruit( String name,  boolean vegetable,  String description,  Date seasonbegin,  Date seasonend,  Season season ) {
    	this.name = name;
    	this.vegetable = vegetable;
    	this.description = description;
    	this.seasonbegin = seasonbegin;
    	this.seasonend = seasonend;
    	this.season = season;
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
	  * @return the vegetable
	  */
	public boolean getVegetable() {			
		return this.vegetable;
	}
	
	/**
	  * @param vegetable 
	  *			the vegetable to set
	  */
	public void setVegetable( boolean vegetable ) {
		this.vegetable = vegetable;
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
	
	/**
	  * @return the season
	  */
	public Season getSeason() {			
		return this.season;
	}
	
	/**
	  * @param season 
	  *			the season to set
	  */
	public void setSeason( Season season ) {
		this.season = season;
	}
	
    
    
    @Override
    public String toString() {
    	return "Fruit [ name = " +  name + ", vegetable = " +  vegetable + ", description = " +  description + ", seasonbegin = " +  seasonbegin + ", seasonend = " +  seasonend + ", season = " +  season+ "]"  ;
    }
}
