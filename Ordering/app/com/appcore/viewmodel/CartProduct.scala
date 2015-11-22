package com.appcore.viewmodel

import play.api.libs.json.{Reads, JsPath, Writes}
import com.appcore.viewmodel.CartProduct
import play.api._
import play.api.data.Form
import play.api.mvc._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.functional.syntax._

/**
  * Created by Jeremy on 22/11/2015.
  */

case class CartProduct(id : String, qty : Double)

object CartProduct {
  implicit val cartProductReads: Reads[CartProduct] = (
    (JsPath \ "id").read[String] and
      (JsPath \ "qty").read[Double]
    )(CartProduct.apply _)
}
