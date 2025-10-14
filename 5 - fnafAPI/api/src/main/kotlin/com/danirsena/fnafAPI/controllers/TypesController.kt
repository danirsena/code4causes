package com.danirsena.fnafAPI.controllers

import com.danirsena.fnafAPI.entities.TypeAnimatronic
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

@RestController
@RequestMapping("apiFNAF/types")
class TypesController (private val typesRepository: TypesRepository) {

    @GetMapping
    fun getAllTypes(): ResponseEntity<List<TypeAnimatronic>> {
        val types = typesRepository.findAll()
        if (types.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(types)
    }

    @GetMapping("/{id}")
    fun getTypeById(@PathVariable id: Long): ResponseEntity<TypeAnimatronic>{
        val type = typesRepository.findById(id)
        if (type.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        return ResponseEntity.ok(type.get())
    }
    @PostMapping("/add")
    fun addType(@RequestBody type: TypeAnimatronic): ResponseEntity<TypeAnimatronic> {
        return ResponseEntity.ok(typesRepository.save(type))
    }

    @PutMapping("/{id}")
    fun updateType(@PathVariable id: Long, @RequestBody updatedType: TypeAnimatronic): ResponseEntity<TypeAnimatronic> {
        val existingType = typesRepository.findById(id)
        if (existingType.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        val typeToUpdate = existingType.get()
        typeToUpdate.name = updatedType.name
        typeToUpdate.description = updatedType.description
        return ResponseEntity.ok(typesRepository.save(typeToUpdate))
    }

    @DeleteMapping("/{id}")
    fun deleteType(@PathVariable id: Long): ResponseEntity<Void> {
        val type = typesRepository.findById(id)
        if (type.isEmpty) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
        typesRepository.delete(type.get())
        return ResponseEntity.ok().build()
    }
}