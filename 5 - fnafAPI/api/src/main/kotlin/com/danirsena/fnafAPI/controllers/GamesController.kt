package com.danirsena.fnafAPI.controllers

import com.danirsena.fnafAPI.entities.Games
import com.danirsena.fnafAPI.repository.GamesRepository
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
@RequestMapping("apiFNAF/games")
class GamesController (val gamesRepository: GamesRepository) {

    @GetMapping
    fun getAllGames(): ResponseEntity<List<Games>> {
        val games = gamesRepository.findAll()
        if (games.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(games)
    }

    @GetMapping("/{id}")
    fun getGameById(@PathVariable id: Long): ResponseEntity<Games> {
        val game = gamesRepository.findById(id)
        if (game.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(game.get())
    }

    @PostMapping("/add")
    fun addGame(@RequestBody game: Games): ResponseEntity<Games> {
        return ResponseEntity.ok(gamesRepository.save(game))
    }

    @PutMapping("/{id}")
    fun updateGame(@PathVariable id: Long, @RequestBody updatedGame: Games): ResponseEntity<Games> {
        val existingGame = gamesRepository.findById(id)
        if (existingGame.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        val gameToUpdate = existingGame.get()
        gameToUpdate.name = updatedGame.name?: gameToUpdate.name
        gameToUpdate.description = updatedGame.description?: gameToUpdate.description
        gameToUpdate.photoUrl = updatedGame.photoUrl?: gameToUpdate.photoUrl
        gameToUpdate.dateOfRelease = updatedGame.dateOfRelease?: gameToUpdate.dateOfRelease
        gameToUpdate.creator = updatedGame.creator?: gameToUpdate.creator
        return ResponseEntity.ok(gamesRepository.save(gameToUpdate))
    }

    @DeleteMapping("/{id}")
    fun deleteGame(@PathVariable id: Long): ResponseEntity<Void> {
        val game = gamesRepository.findById(id)
        if (game.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        gamesRepository.delete(game.get())
        return ResponseEntity.ok().build()
    }
}