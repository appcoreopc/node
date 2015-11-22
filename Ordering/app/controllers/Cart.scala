package controllers

/**
  * Created by Jeremy on 21/11/2015.
  */

import com.appcore.viewmodel.CartProduct
import play.api._
import play.api.data.Form
import play.api.mvc._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.functional.syntax._


class Cart extends Controller {

  def index = Action {
    Ok("ok")
  }

  def add = Action(BodyParsers.parse.json)
  {
    request => val cartProduct = request.body.validate[CartProduct]

    Ok("ok")
  }

  /*
    def add(products : List[CartProduct]) = Action {
      Ok("Add")
    }
  */
}


