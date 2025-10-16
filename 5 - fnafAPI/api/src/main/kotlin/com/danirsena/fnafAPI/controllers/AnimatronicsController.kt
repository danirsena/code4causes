package com.danirsena.fnafAPI.controllers

import com.danirsena.fnafAPI.dto.AnimatronicsDTO
import com.danirsena.fnafAPI.dto.CREATEAnimatronicDTO
import com.danirsena.fnafAPI.entities.Animatronic
import com.danirsena.fnafAPI.repository.AnimatronicsRepository
import com.danirsena.fnafAPI.repository.GamesRepository
import com.danirsena.fnafAPI.repository.TypesRepository
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
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("apiFNAF/animatronics")
class AnimatronicsController(
    private val animatronicRepository: AnimatronicsRepository,
    private val typesRepository: TypesRepository,
    private val gamesRepository: GamesRepository
) {

    @GetMapping()
    fun getAllAnimatronics(): ResponseEntity<List<Animatronic>> {
        val animatronics = animatronicRepository.findAll()
        if (animatronics.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(animatronics)
    }

    @GetMapping("/{id}")
    fun getAnimatronicById(@PathVariable id: Long): ResponseEntity<Animatronic> {
        val animatronic = animatronicRepository.findById(id)
        if (animatronic.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(animatronic.get())
    }

    @PostMapping("/add")
    fun addAnimatronic(@RequestBody animatronic: CREATEAnimatronicDTO): ResponseEntity<Any> {
        val type = typesRepository.findById(animatronic.typeId)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de animatronic não encontrado (id=${animatronic.typeId})") }

        val game = gamesRepository.findById(animatronic.gameId)
            .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado (id=${animatronic.gameId})") }

        val animatronicToSave = Animatronic(
            name = animatronic.name,
            description = animatronic.description,
            creator = animatronic.creator,
            typeAnimatronic = type,
            game = game,
            characterVoice = animatronic.characterVoice,
            possessed = animatronic.possessed,
            audios = emptyList(),
            photos = emptyList()
        )

        val saved = animatronicRepository.save(animatronicToSave)
        return ResponseEntity.status(HttpStatus.CREATED).body(saved)
    }


    @PostMapping("/addBatch")
    fun addBatchAnimatronics(@RequestBody animatronics: List<CREATEAnimatronicDTO>): ResponseEntity<List<Animatronic>> {
        val animatronicsToSave = animatronics.map { animatronic ->
            Animatronic(
                name = animatronic.name,
                description = animatronic.description,
                creator = animatronic.creator,
                typeAnimatronic = typesRepository.findById(animatronic.typeId)
                    .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de animatronic não encontrado (id=${animatronic.typeId})") },
                game = gamesRepository.findById(animatronic.gameId)
                    .orElseThrow { ResponseStatusException(HttpStatus.NOT_FOUND, "Jogo não encontrado (id=${animatronic.gameId})") },
                characterVoice = animatronic.characterVoice,
                possessed = animatronic.possessed,
                audios = emptyList(),
                photos = emptyList()
            )
        }
        return ResponseEntity.ok(animatronicRepository.saveAll(animatronicsToSave))
    }

    @PutMapping("/{id}")
    fun updateAnimatronic(@PathVariable id: Long, @RequestBody updatedAnimatronic: Animatronic): ResponseEntity<Animatronic> {
        val existingAnimatronic = animatronicRepository.findById(id)
        if (existingAnimatronic.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        val animatronicToUpdate = existingAnimatronic.get()
        animatronicToUpdate.name = updatedAnimatronic.name
        animatronicToUpdate.description = updatedAnimatronic.description
        return ResponseEntity.ok(animatronicRepository.save(animatronicToUpdate))
    }

    @DeleteMapping("/{id}")
    fun deleteAnimatronic(@PathVariable id: Long): ResponseEntity<Void> {
        val animatronic = animatronicRepository.findById(id)
        if (animatronic.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        animatronicRepository.delete(animatronic.get())
        return ResponseEntity.ok().build()
    }
}