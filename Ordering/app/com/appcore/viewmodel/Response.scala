package com.appcore.viewmodel

/**
  * Created by Jeremy on 21/11/2015.
  */
import play.api.libs.json._
import play.api.libs.functional.syntax._

case class UserResponse (status : Boolean)
{

}

/*
object UserResponse {
  implicit object UserResponseFormat extends Format[UserResponse] {
    def reads(json: JsValue): UserResponse = UserResponse((json \ "status").as[Boolean])
    def writes(o: UserResponse): JsValue = JsObject(List("status" -> JsBoolean(o.status)))
  }
}
*/
