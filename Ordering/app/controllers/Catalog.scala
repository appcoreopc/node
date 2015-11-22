package controllers

/**
  * Created by Jeremy on 21/11/2015.
  */

import com.appcore.viewmodel.{UserResponse}
import play.api._
import play.api.libs.json.Json
import play.api.mvc._

class Catalog extends Controller {

  def index = Action { implicit request =>
    //val blah = Json.parse(request.body.asText.get).as[UserResponse]
    Ok("catalog")
    // to return Blah as application/json, you just have to convert your Blah to a JsValue and give it to Ok()
    //Ok(Json.toJson(blah))
  }

  def listProduct(productId : String) = Action {
    Ok("product")
  }
}
