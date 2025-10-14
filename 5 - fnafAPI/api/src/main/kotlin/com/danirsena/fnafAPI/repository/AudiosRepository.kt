package com.danirsena.fnafAPI.repository

import com.danirsena.fnafAPI.entities.Audio
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface AudiosRepository: JpaRepository<Audio, Long> {
}