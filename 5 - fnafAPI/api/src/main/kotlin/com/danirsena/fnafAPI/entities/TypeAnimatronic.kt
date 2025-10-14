package com.danirsena.fnafAPI.entities

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter

@Entity
@Table(name = "animatronic_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
data class TypeAnimatronic(

    @Column @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) val id: Long,

    @Column var name: String,

    @Column var description: String,

    @OneToMany(mappedBy = "typeAnimatronic", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonBackReference
    val animatronics: List<Animatronic> = mutableListOf()
)