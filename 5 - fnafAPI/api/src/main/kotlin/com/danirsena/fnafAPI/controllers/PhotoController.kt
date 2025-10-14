package com.danirsena.fnafAPI.controllers

import com.danirsena.fnafAPI.dto.CREATEphotoDTO
import com.danirsena.fnafAPI.dto.PhotosDTO
import com.danirsena.fnafAPI.entities.Photo
import com.danirsena.fnafAPI.repository.AnimatronicsRepository
import com.danirsena.fnafAPI.repository.PhotosRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("apiFNAF/photos")
class PhotoController(val photosRepository: PhotosRepository, val animatronicRepository: AnimatronicsRepository) {

    @GetMapping
    fun getAllPhotos(): ResponseEntity<List<Photo>> {
        val photos = photosRepository.findAll()
        if (photos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(photos)
    }

    @GetMapping("/{id}")
    fun getPhotoById(@PathVariable id: Long): ResponseEntity<Photo> {
        val photo = photosRepository.findById(id)
        if (photo.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(photo.get())
    }

    @PostMapping("/add")
    fun addPhoto(@RequestBody photo: CREATEphotoDTO): ResponseEntity<Photo> {

        val animatronic = animatronicRepository.findById(photo.animatronicId)
        if (animatronic.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }

        val newPhoto = Photo(
            id = 0, // Deixa o JPA gerar o ID
            url = photo.url,
            animatronic = animatronic.get()
        )

        return ResponseEntity.ok(photosRepository.save(newPhoto))
    }


    @PutMapping("/{id}")
    fun updatePhoto(@PathVariable id: Long, @RequestBody updatedPhoto: PhotosDTO): ResponseEntity<Photo> {
        val existingPhoto = photosRepository.findById(id)
        if (existingPhoto.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        val photoToUpdate = existingPhoto.get()
        photoToUpdate.url = updatedPhoto.url
        return ResponseEntity.ok(photosRepository.save(photoToUpdate))
    }

    @DeleteMapping("/{id}")
    fun deletePhoto(@PathVariable id: Long): ResponseEntity<Void> {
        val photo = photosRepository.findById(id)
        if (photo.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        photosRepository.delete(photo.get())
        return ResponseEntity.ok().build()
    }
}