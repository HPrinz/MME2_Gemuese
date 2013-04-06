
package de.bht.mme2.waswaechstwann.server.pojos;

import de.bht.mme2.waswaechstwann.server.pojos.Fruit;
import java.util.List;


/**
  * 
  * @generated
  */

public class Recipe  {
  	
  	
  	 String name ;
  	 String description ;
  	 List<String> pictures ;
  	 List<String> ingridients ;
  	 List<Fruit> vegetables ;
	
    /**
      * Standard Constructor with all needed attributes
      */
    public Recipe( String name,  String description,  List<String> pictures,  List<String> ingridients,  List<Fruit> vegetables ) {
    	this.name = name;
    	this.description = description;
    	this.pictures = pictures;
    	this.ingridients = ingridients;
    	this.vegetables = vegetables;
    }
    
    
    /**
      * Empty Constructor
      */
    public Recipe() {
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
	  * @return the pictures
	  */
	public List<String> getPictures() {			
		return this.pictures;
	}
	
	/**
	  * @param pictures 
	  *			the pictures to set
	  */
	public void setPictures( List<String> pictures ) {
		this.pictures = pictures;
	}
	
	/**
	  * @return the ingridients
	  */
	public List<String> getIngridients() {			
		return this.ingridients;
	}
	
	/**
	  * @param ingridients 
	  *			the ingridients to set
	  */
	public void setIngridients( List<String> ingridients ) {
		this.ingridients = ingridients;
	}
	
	/**
	  * @return the vegetables
	  */
	public List<Fruit> getVegetables() {			
		return this.vegetables;
	}
	
	/**
	  * @param vegetables 
	  *			the vegetables to set
	  */
	public void setVegetables( List<Fruit> vegetables ) {
		this.vegetables = vegetables;
	}
	
    
    
    @Override
    public String toString() {
    	return "Recipe [ name = " +  name + ", description = " +  description + ", pictures = " +  pictures + ", ingridients = " +  ingridients + ", vegetables = " +  vegetables+ "]"  ;
    }
}
