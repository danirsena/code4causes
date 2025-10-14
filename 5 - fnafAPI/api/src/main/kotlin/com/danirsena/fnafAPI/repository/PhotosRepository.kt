package com.danirsena.fnafAPI.repository

import com.danirsena.fnafAPI.entities.Photo
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PhotosRepository: JpaRepository<Photo, Long> {
}