package com.danirsena.fnafAPI.repository

import com.danirsena.fnafAPI.controllers.TypesController
import com.danirsena.fnafAPI.entities.TypeAnimatronic
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository


@Repository
interface TypesRepository: JpaRepository<TypeAnimatronic, Long> {

}