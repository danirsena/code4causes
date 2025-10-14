package com.danirsena.fnafAPI.repository

import com.danirsena.fnafAPI.entities.Games
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GamesRepository : JpaRepository<Games, Long> {
}