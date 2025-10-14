package com.danirsena.fnafAPI.entities

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Table
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter

@Entity
@Table(name = "Animatronics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
data class Animatronic(

    @Column @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) val id: Long = 0,

    @Column var name: String,
    @Column var description: String?,
    @Column(name = "character_voice") val characterVoice: String?,
    @Column var creator: String?,
    @Column var possessed: Boolean,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    @JsonManagedReference
    val typeAnimatronic: TypeAnimatronic,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    @JsonManagedReference
    val game: Games,

    @OneToMany(mappedBy = "animatronic", cascade = [CascadeType.ALL])
    @JsonManagedReference
    val audios: List<Audio>?,

    @OneToMany(mappedBy = "animatronic", cascade = [CascadeType.ALL])
    @JsonManagedReference
    val photos: List<Photo>?
)