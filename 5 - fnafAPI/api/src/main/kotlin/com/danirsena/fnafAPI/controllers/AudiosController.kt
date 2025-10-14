package com.danirsena.fnafAPI.controllers

import com.danirsena.fnafAPI.dto.CREATEAudioDTO
import com.danirsena.fnafAPI.dto.CREATEphotoDTO
import com.danirsena.fnafAPI.dto.PhotosDTO
import com.danirsena.fnafAPI.entities.Audio
import com.danirsena.fnafAPI.entities.Photo
import com.danirsena.fnafAPI.repository.AnimatronicsRepository
import com.danirsena.fnafAPI.repository.AudiosRepository
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
@RequestMapping("apiFNAF/audios")
class AudiosController(
    val audiosRepository: AudiosRepository,
    val animatronicsRepository: AnimatronicsRepository
) {

    @GetMapping
    fun getAllAudios(): ResponseEntity<List<Audio>> {
        val audios = audiosRepository.findAll()
        if (audios.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(audios)
    }

    @GetMapping("/{id}")
    fun getAudioById(@PathVariable id: Long): ResponseEntity<Audio> {
        val audio = audiosRepository.findById(id)
        if (audio.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(audio.get())
    }

    @PostMapping("/add")
    fun addPhoto(@RequestBody photo: CREATEAudioDTO): ResponseEntity<Audio> {

        val animatronic = animatronicsRepository.findById(photo.animatronicId)
        if (animatronic.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }

        val nemAudio = Audio(
            id = 0, // Deixa o JPA gerar o ID
            url = photo.url,
            animatronic = animatronic.get()
        )

        return ResponseEntity.ok(audiosRepository.save(nemAudio))
    }

    @PostMapping("/addBatch")
    fun addBatchAudios(@RequestBody audios: List<Audio>): ResponseEntity<List<Audio>> {
        return ResponseEntity.ok(audiosRepository.saveAll(audios))
    }

    @PutMapping("/{id}")
    fun updateAudio(@PathVariable id: Long, @RequestBody updatedAudio: Audio): ResponseEntity<Audio> {
        val existingAudio = audiosRepository.findById(id)
        if (existingAudio.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        val audioToUpdate = existingAudio.get()
        audioToUpdate.url = updatedAudio.url
        return ResponseEntity.ok(audiosRepository.save(audioToUpdate))
    }

    @DeleteMapping("/{id}")
    fun deleteAudio(@PathVariable id: Long): ResponseEntity<Void> {
        val audio = audiosRepository.findById(id)
        if (audio.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        audiosRepository.delete(audio.get())
        return ResponseEntity.ok().build()
    }
}