package controllers

/**
  * Created by Jeremy on 21/11/2015.
  */

import com.appcore.viewmodel.{Product, UserResponse}
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

  def getAll() = Action {
    val result = getFakeProduct()
    Ok(Json.arr(result))
  }

  def getProduct(productId : String) = Action {
    val p = new Product("Demo", "Demo App", 12.0)
    Ok(Json.toJson(p))
  }

  def getFakeProduct(): List[com.appcore.viewmodel.Product] = {

    var a = new Product("test1", "test desc", 12.0)
    var b = new Product("test1", "test desc", 12.0)

    return  a :: b :: Nil
  }
}
