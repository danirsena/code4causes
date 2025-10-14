package com.danirsena.fnafAPI.repository

import com.danirsena.fnafAPI.entities.Animatronic
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AnimatronicsRepository : JpaRepository<Animatronic, Long> {
}