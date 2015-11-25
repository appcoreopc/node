package com.appcore.viewmodel

import play.api.libs.json.{Reads, JsPath}
import play.api.libs.json.Json
import play.api.libs.functional.syntax._

/**
  * Created by Jeremy on 22/11/2015.
  */

case class CartProduct(id : String, qty : Double)

object CartProduct {

  implicit val cartProductWrites  = Json.writes[CartProduct]

  implicit val cartProductReads: Reads[CartProduct] = (
    (JsPath \ "id").read[String] and
      (JsPath \ "qty").read[Double]
    )(CartProduct.apply _)



}
